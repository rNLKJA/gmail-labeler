#!/usr/bin/env -S uv run
# /// script
# requires-python = ">=3.12"
# dependencies = []
# ///

"""
Generate synthetic inbox data for Gmail Labeler demo.
Produces 100 synthetic email threads (sender, subject, date) based on
the provider taxonomy in the original skill.
"""

import csv
import random
from datetime import datetime, timedelta
from pathlib import Path

# Provider examples from the taxonomy
PROVIDERS = [
    # Banking & Finance
    ("notifications@chase.com", "Chase", [
        "Your statement is ready",
        "Security alert: New device login",
        "Account balance notification"
    ]),
    ("alerts@paypal.com", "PayPal", [
        "You sent $45.00 to Coffee Shop",
        "Receipt for your payment to Netflix",
        "Your PayPal account statement"
    ]),
    ("noreply@revolut.com", "Revolut", [
        "Your card purchase at Woolworths",
        "New card transaction: $12.50",
        "Monthly spending summary"
    ]),

    # Shopping
    ("ship-confirm@amazon.com", "Amazon", [
        "Your order has shipped",
        "Order delivered: Package at front door",
        "Receipt for Order #123-4567890"
    ]),
    ("orders@ebay.com", "eBay", [
        "Your item sold!",
        "Order update: Seller shipped your item",
        "Leave feedback for your recent purchase"
    ]),
    ("receipts@uber.com", "Uber", [
        "Your trip with James",
        "Receipt for your ride to airport",
        "Uber: Your ride receipt"
    ]),

    # Subscriptions - Streaming
    ("info@netflix.com", "Netflix", [
        "Your monthly bill is ready",
        "New releases you might like",
        "We've updated our terms of service"
    ]),
    ("no-reply@spotify.com", "Spotify", [
        "Your Premium renewal",
        "Wrapped: Your year in music",
        "Payment confirmation"
    ]),
    ("notifications@disneyplus.com", "Disney+", [
        "New on Disney+",
        "Your subscription renews tomorrow",
        "Watch these before they leave"
    ]),

    # Subscriptions - SaaS
    ("team@notion.so", "Notion", [
        "Your workspace bill",
        "New features in Notion",
        "Team plan renewal"
    ]),
    ("notifications@github.com", "GitHub", [
        "Billing update",
        "[user/repo] New issue opened",
        "Your GitHub Copilot subscription"
    ]),
    ("billing@vercel.com", "Vercel", [
        "Your monthly invoice",
        "Usage alert: Approaching limits",
        "Payment successful"
    ]),

    # Bills & Utilities
    ("noreply@agl.com.au", "AGL Energy", [
        "Your energy bill is ready",
        "Bill due in 5 days",
        "Your latest energy bill"
    ]),
    ("accounts@telstra.com", "Telstra", [
        "Your bill is ready to view",
        "Payment received - thank you",
        "Mobile plan renewal"
    ]),

    # Government
    ("noreply@ato.gov.au", "ATO", [
        "Notice of Assessment",
        "Your tax return has been processed",
        "ATO correspondence available"
    ]),
    ("noreply@mygov.com.au", "myGov", [
        "You have new messages",
        "Important: Action required",
        "Service update"
    ]),

    # Health
    ("memberservices@bupa.com.au", "Bupa", [
        "Your claim has been processed",
        "Policy renewal reminder",
        "Health insurance statement"
    ]),
    ("orders@chemistwarehouse.com.au", "Chemist Warehouse", [
        "Order confirmation",
        "Your prescription is ready",
        "Special offer: 20% off vitamins"
    ]),

    # Travel
    ("reservations@qantas.com.au", "Qantas", [
        "Booking confirmed: SYD to MEL",
        "Check-in now for your flight",
        "Trip reminder: Flight tomorrow"
    ]),
    ("noreply@booking.com", "Booking.com", [
        "Confirmation: Your stay at Hotel",
        "Rate your recent stay",
        "30% off your next booking"
    ]),
    ("confirm@airbnb.com", "Airbnb", [
        "Reservation confirmed",
        "Check-in instructions",
        "Review your recent stay"
    ]),

    # News & Newsletters
    ("hello@tldrnewsletter.com", "TLDR", [
        "TLDR: 5 stories from your day",
        "Top tech news today",
        "Weekend edition: Best of the week"
    ]),
    ("newsletters@substack.com", "Substack", [
        "Weekly roundup from [Author]",
        "New post: The future of AI",
        "You have 3 unread posts"
    ]),
    ("team@morningbrew.com", "Morning Brew", [
        "Your daily business brief",
        "Markets today",
        "The weekend edition"
    ]),

    # Career
    ("messages@linkedin.com", "LinkedIn", [
        "You appeared in 12 searches this week",
        "New job opportunities",
        "Connection request from [Name]"
    ]),
    ("noreply@seek.com.au", "Seek", [
        "New jobs matching your search",
        "Job alert: Senior Developer",
        "Your application was viewed"
    ]),

    # Food Delivery
    ("no-reply@ubereats.com", "Uber Eats", [
        "Your order from [Restaurant]",
        "Rate your recent order",
        "Receipt: Order delivered"
    ]),
    ("noreply@deliveroo.co.uk", "Deliveroo", [
        "Your order is on the way",
        "Order delivered!",
        "Thanks for your order"
    ]),

    # Social (minimal - most social goes to apps, not email)
    ("notification@twitter.com", "Twitter", [
        "[User] mentioned you",
        "Weekly top tweets",
        "Security: New login detected"
    ]),
]


def generate_synthetic_inbox(num_threads: int = 100) -> list[dict]:
    """Generate synthetic inbox threads."""
    threads = []
    end_date = datetime.now()
    start_date = end_date - timedelta(days=90)  # Last 90 days

    for _ in range(num_threads):
        sender_email, sender_name, subjects = random.choice(PROVIDERS)
        subject = random.choice(subjects)

        # Random date in the last 90 days
        days_ago = random.randint(0, 90)
        date = end_date - timedelta(days=days_ago)

        threads.append({
            "sender": f"{sender_name} <{sender_email}>",
            "subject": subject,
            "date": date.strftime("%Y-%m-%d %H:%M:%S")
        })

    # Sort by date descending (newest first)
    threads.sort(key=lambda x: x["date"], reverse=True)
    return threads


def main():
    # Generate 100 threads
    threads = generate_synthetic_inbox(100)

    # Output path
    output_dir = Path(__file__).parent.parent / "web" / "public" / "data"
    output_dir.mkdir(parents=True, exist_ok=True)
    output_file = output_dir / "synthetic-inbox.csv"

    # Write CSV
    with open(output_file, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["sender", "subject", "date"])
        writer.writeheader()
        writer.writerows(threads)

    print(f"✓ Generated {len(threads)} synthetic inbox threads")
    print(f"✓ Written to {output_file}")

    # Show sample
    print("\nSample (first 5):")
    for thread in threads[:5]:
        print(f"  {thread['date']} | {thread['sender']}")
        print(f"    → {thread['subject']}")


if __name__ == "__main__":
    main()
