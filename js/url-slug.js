function createSlug(title) {
    return title.replace(/[^\w\s]/gi, '') // Remove non-alphanumeric characters
        .replace(/\s+/g, '-') // Replace spaces with dashes
        .toLowerCase();
}
const titles = [
    "10 Unmissable Experiences on a Caribbean Cruise in 2023",
    "Cruise the World: 15 Best Cruise Lines for Solo Travelers in 2023",
    "The Ultimate Mediterranean Cruise Itinerary for Foodies in 2023",
    "Avoiding Seasickness: Top Tips for a Smooth Sailing in 2023",
    "The Best European River Cruises to Take in 2023",
    "Luxury at Sea: Top 10 Most Expensive Cruise Ships in 2023",
    "Exploring the Wonders of Alaska: Best Cruises for Nature Lovers in 2023",
    "Sailing through History: Discovering Ancient Ruins on a Mediterranean Cruise in 2023",
    "Family-Friendly Cruises: Top 5 Cruise Lines for Kids in 2023",
    "The Ultimate Guide to Planning a Romantic Cruise Getaway in 2023",
    "Cruise on a Budget: 10 Affordable Cruise Lines for 2023",
    "Cruising Asia: Discovering the Best Ports of Call in 2023",
    "Sea Adventures: 10 Best Cruises for Thrill-Seekers in 2023",
    "Cruise like a Pro: Tips and Tricks for a Perfect Cruise in 2023",
    "Experience the Northern Lights: Best Arctic Cruises to Take in 2023",
    "Wine Tasting on a Cruise: Discovering the Best Wine Regions in 2023",
    "The Ultimate Guide to Planning a Group Cruise in 2023",
    "Cruising the Panama Canal: Best Routes and Sights to See in 2023",
    "Cruise Line Smackdown: Comparing the Best Cruise Lines in 2023",
    "Beyond the Beach: Exploring Local Culture on a Caribbean Cruise in 2023",
    "The Ultimate Guide to Planning a Cruise Ship Wedding in [Keywords]",
    "[Keywords] Cruises: The Best Cruise Lines for a Family Vacation",
    "How to Stay Healthy on a Cruise: Tips for [Keywords] Travelers",
    "[Keywords] Cruise Deals: How to Find the Best Discounts in 2023",
    "The Best [Keywords] River Cruises to Take in 2023",
    "10 Reasons to Take a Cruise to [Keywords] in 2023",
    "[Keywords] Cruise Ports: The Best Places to Explore on Shore",
    "How to Avoid Seasickness on Your Next [Keywords] Cruise",
    "The Best [Keywords] Cruise Itineraries to Book in 2023",
    "How to Pack for a Cruise: Essential Tips for [Keywords] Travelers",
    "[Keywords] River Cruise vs. Ocean Cruise: Which is Right for You?",
    "The Best [Keywords] Cruises for Adventure Seekers in 2023",
    "The Top [Keywords] Cruise Lines for Luxury Travel in 2023",
    "Exploring the World's Coolest Ports on a [Keywords] Cruise",
    "The Best Time to Take a Cruise to [Keywords]: A Seasonal Guide",
    "[Keywords] Cruise Excursions: How to Plan the Perfect Shore Trip",
    "The Best [Keywords] Cruises for Solo Travelers in 2023",
    "The Best [Keywords] Themed Cruises to Book in 2023",
    "The Best [Keywords] River Cruise Lines for Foodies in 2023",
    "The Best [Keywords] Cruises for Scuba Diving in 2023",
    "10 Best Caribbean Islands to Visit in 2023 for a Dream Cruise",
    "The Ultimate Guide to Planning Your First Family Cruise in 2023",
    "Luxury Cruise Ships: 15 of the Best Ships to Sail in 2023",
    "How to Stay Safe on a Cruise: Tips for Solo Travelers in 2023",
    "The Best Food and Drinks to Try on Your Next Cruise in 2023",
    "How to Pack for a Cruise: The Ultimate Checklist for 2023",
];

titles.forEach(title => {
    const slug = createSlug(title);
    console.log(slug);
});