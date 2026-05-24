#!/usr/bin/env python3
"""Validate provider-rules.md tables before generating Gmail filters."""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

# Allow importing sibling script when run as `python scripts/validate_rules.py`
sys.path.insert(0, str(Path(__file__).resolve().parent))

from generate_filters import SKIP_SECTION, normalise_rule, parse_table_rows  # noqa: E402

VALID_DEFAULTS = frozenset({"keep", "archive"})
VALID_CONTENT_TYPES = frozenset(
    {"receipt", "marketing", "security", "newsletter", "account", "other", ""}
)
MULTI_TYPE_SECTION = re.compile(r"^##\s+Multi-type brands", re.IGNORECASE)


class ValidationResult:
    def __init__(self) -> None:
        self.errors: list[str] = []
        self.warnings: list[str] = []

    def error(self, msg: str) -> None:
        self.errors.append(msg)

    def warn(self, msg: str) -> None:
        self.warnings.append(msg)

    @property
    def ok(self) -> bool:
        return not self.errors


def iter_tables(path: Path) -> list[tuple[str | None, list[dict[str, str]], int]]:
    """Return (section_name, rows, line_number) for each rules table."""
    text = path.read_text(encoding="utf-8")
    lines = text.splitlines()
    tables: list[tuple[str | None, list[dict[str, str]], int]] = []
    section: str | None = None
    i = 0

    while i < len(lines):
        line = lines[i]
        if SKIP_SECTION.match(line):
            break
        if line.startswith("## "):
            section = line[3:].strip()
        if line.strip().startswith("|") and "Domain" in line:
            rows, next_i = parse_table_rows(lines, i)
            if rows:
                tables.append((section, rows, i + 1))
            i = next_i
            continue
        i += 1

    return tables


def validate_rules(path: Path) -> ValidationResult:
    result = ValidationResult()
    if not path.is_file():
        result.error(f"Rules file not found: {path}")
        return result

    tables = iter_tables(path)
    if not tables:
        result.error("No provider rules tables found (expected | Domain | ... |)")
        return result

    seen_keys: dict[tuple[str, str], int] = {}
    rule_count = 0

    for section, rows, start_line in tables:
        in_multi_type = section is not None and MULTI_TYPE_SECTION.match(f"## {section}")
        domain_counts: dict[str, int] = {}

        for offset, row in enumerate(rows):
            line_no = start_line + offset + 2  # header + separator
            domain = row.get("Domain", "").strip()
            match = row.get("Match", "").strip()
            label = row.get("Label", "").strip()
            default = row.get("Default", "keep").strip().lower()
            content_type = row.get("Content type", row.get("content_type", "")).strip().lower()

            if domain.startswith("---") or label.startswith("---"):
                continue

            if not domain and not label:
                continue

            if not domain:
                result.error(f"Line {line_no}: missing Domain")
                continue
            if not label:
                result.error(f"Line {line_no}: missing Label for domain {domain!r}")
                continue

            if default not in VALID_DEFAULTS:
                result.error(
                    f"Line {line_no}: invalid Default {default!r} "
                    f"(expected keep or archive) for {domain}"
                )

            if content_type and content_type not in VALID_CONTENT_TYPES:
                result.warn(
                    f"Line {line_no}: unknown content_type {content_type!r} "
                    f"(expected receipt, marketing, security, newsletter, account, other)"
                )

            if "/" not in label:
                result.warn(
                    f"Line {line_no}: label {label!r} has no nested path (Parent/Provider)"
                )

            key = (domain.lower(), match.lower())
            if key in seen_keys:
                result.error(
                    f"Line {line_no}: duplicate Domain+Match "
                    f"({domain!r}, {match!r}) — first at line {seen_keys[key]}"
                )
            else:
                seen_keys[key] = line_no

            domain_counts[domain.lower()] = domain_counts.get(domain.lower(), 0) + 1

            if normalise_rule(row) is None:
                result.error(f"Line {line_no}: row failed normalisation for {domain!r}")

            rule_count += 1

        if in_multi_type:
            for domain, count in domain_counts.items():
                if count > 1:
                    rows_for_domain = [
                        r for r in rows if r.get("Domain", "").strip().lower() == domain
                    ]
                    without_match = [
                        r for r in rows_for_domain if not r.get("Match", "").strip()
                    ]
                    if len(without_match) > 1:
                        result.error(
                            f"Multi-type brands: domain {domain!r} has {count} rows "
                            "but more than one row lacks Match — set Match on duplicate rows"
                        )

    if rule_count == 0:
        result.error("No valid filter rules parsed from tables")

    return result


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate provider-rules.md")
    parser.add_argument(
        "rules",
        nargs="?",
        default="references/provider-rules.md",
        help="Path to provider-rules.md",
    )
    parser.add_argument(
        "--strict",
        action="store_true",
        help="Treat warnings as errors",
    )
    args = parser.parse_args()

    path = Path(args.rules)
    result = validate_rules(path)

    for w in result.warnings:
        print(f"warning: {w}", file=sys.stderr)
    for e in result.errors:
        print(f"error: {e}", file=sys.stderr)

    if result.errors:
        print(f"Validation failed: {len(result.errors)} error(s)", file=sys.stderr)
        return 1
    if result.warnings:
        print(
            f"Validation passed with {len(result.warnings)} warning(s)",
            file=sys.stderr,
        )
        return 2 if args.strict else 0

    print(f"Validation passed: {path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
