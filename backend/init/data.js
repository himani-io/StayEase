const sampleListings = [
  { title: "Luxury Beach Villa",
    description: "Wake up to ocean views in this stunning private villa.", 
    image: { 
      url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511", 
      filename: "listingname" 
    }, 
    price: 12000, 
    location: "Maldives", 
    country: "Maldives" 
  },
  {
    title: "Mountain Cabin Retreat",
    description: "Cozy wooden cabin surrounded by snow-capped peaks.",
    image: {
        url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
        filename: "listingname"
    },
    price: 4500,
    location: "Manali",
    country: "India"
},
{
    title: "Parisian Apartment",
    description: "Elegant stay near Eiffel Tower with balcony view.",
    image: {
        url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
        filename: "listingname"
    },
    price: 9000,
    location: "Paris",
    country: "France"
},
{
    title: "Santorini Cliff House",
    description: "Whitewashed home with breathtaking sunset views.",
    image: {
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        filename: "listingname"
    },
    price: 11000,
    location: "Santorini",
    country: "Greece"
},
{
    title: "New York Loft",
    description: "Modern loft in the heart of Manhattan.",
    image: {
        url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
        filename: "listingname"
    },
    price: 15000,
    location: "New York",
    country: "USA"
},
{
    title: "Desert Luxury Camp",
    description: "Experience royal desert camping with luxury tents.",
    image: {
        url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
        filename: "listingname"
    },
    price: 7000,
    location: "Jaisalmer",
    country: "India"
},
{
    title: "Swiss Alps Chalet",
    description: "Beautiful wooden chalet with mountain views.",
    image: {
        url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
        filename: "listingname"
    },
    price: 13000,
    location: "Zermatt",
    country: "Switzerland"
},
{
    title: "Tokyo Capsule Stay",
    description: "Compact modern capsule hotel experience.",
    image: {
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        filename: "listingname"
    },
    price: 3000,
    location: "Tokyo",
    country: "Japan"
},
{
    title: "Goa Beach Shack",
    description: "Relax in a vibrant beachside shack.",
    image: {
        url: "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
        filename: "listingname"
    },
    price: 3500,
    location: "Goa",
    country: "India"
},
{
    title: "Dubai Skyline Apartment",
    description: "Luxury apartment with Burj Khalifa view.",
    image: {
        url: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade",
        filename: "listingname"
    },
    price: 14000,
    location: "Dubai",
    country: "UAE"
},
{
    title: "Lakeview Cottage",
    description: "Peaceful cottage beside a serene lake.",
    image: {
      url: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353",
      filename: "listingname"
    },
    price: 4000,
    location: "Nainital",
    country: "India"
  },
  {
    title: "Bali Jungle Villa",
    description: "Private pool villa surrounded by tropical forest.",
    image: {
      url: "https://images.unsplash.com/photo-1499696010181-6e13f7c1c5b4",
      filename: "listingname"
    },
    price: 8000,
    location: "Ubud",
    country: "Indonesia"
  },
  {
    title: "London Studio Flat",
    description: "Compact stylish stay in central London.",
    image: {
      url: "https://images.unsplash.com/photo-1494526585095-c41746248156",
      filename: "listingname"
    },
    price: 10000,
    location: "London",
    country: "UK"
  },
  {
    title: "Sydney Harbour View",
    description: "Apartment overlooking Opera House.",
    image: {
      url: "https://images.unsplash.com/photo-1506976785307-8732e854ad03",
      filename: "listingname"
    },
    price: 12500,
    location: "Sydney",
    country: "Australia"
  },
  {
    title: "Canadian Log Cabin",
    description: "Rustic cabin in snowy forest.",
    image: {
      url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
      filename: "listingname"
    },
    price: 5000,
    location: "Banff",
    country: "Canada"
  },
  {
    title: "Iceland Glass Igloo",
    description: "Watch northern lights from your bed.",
    image: {
      url: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
      filename: "listingname"
    },
    price: 16000,
    location: "Reykjavik",
    country: "Iceland"
  },
  {
    title: "Rome Heritage Stay",
    description: "Classic Italian home near Colosseum.",
    image: {
      url: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9",
      filename: "listingname"
    },
    price: 9500,
    location: "Rome",
    country: "Italy"
  },
  {
    title: "Thailand Beach Resort",
    description: "Palm-lined luxury beachfront resort.",
    image: {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      filename: "listingname"
    },
    price: 7500,
    location: "Phuket",
    country: "Thailand"
  },
  {
    title: "Cape Town Ocean Villa",
    description: "Panoramic Atlantic ocean views.",
    image: {
      url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      filename: "listingname"
    },
    price: 9000,
    location: "Cape Town",
    country: "South Africa"
  },
  {
    title: "Amsterdam Canal House",
    description: "Charming house along scenic canals.",
    image: {
      url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
      filename: "listingname"
    },
    price: 11000,
    location: "Amsterdam",
    country: "Netherlands"
  },
  {
    title: "Himalayan Eco Lodge",
    description: "Sustainable stay in the mountains.",
    image: {
        url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
        filename: "listingname"
    },
    price: 4200,
    location: "Kasol",
    country: "India"
},
{
    title: "Seoul Modern Apartment",
    description: "Stylish high-rise apartment.",
    image: {
        url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
        filename: "listingname"
    },
    price: 8500,
    location: "Seoul",
    country: "South Korea"
},
{
    title: "Rio Beach Apartment",
    description: "Live steps away from Copacabana.",
    image: {
        url: "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
        filename: "listingname"
    },
    price: 7000,
    location: "Rio de Janeiro",
    country: "Brazil"
},
{
    title: "Barcelona Penthouse",
    description: "Luxury penthouse with city skyline view.",
    image: {
        url: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade",
        filename: "listingname"
    },
    price: 12000,
    location: "Barcelona",
    country: "Spain"
},
{
    title: "Egypt Nile Cruise Stay",
    description: "Stay on a luxury cruise on the Nile.",
    image: {
        url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
        filename: "listingname"
    },
    price: 9500,
    location: "Luxor",
    country: "Egypt"
},
{
    title: "Vienna Classic Apartment",
    description: "Historic charm meets modern comfort.",
    image: {
      url: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353",
      filename: "listingname"
    },
    price: 9800,
    location: "Vienna",
    country: "Austria"
  },
  {
    title: "Prague Old Town Stay",
    description: "Medieval architecture and cozy interiors.",
    image: {
      url: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9",
      filename: "listingname"
    },
    price: 7200,
    location: "Prague",
    country: "Czech Republic"
  },
  {
    title: "Lisbon Sea View Apartment",
    description: "Bright apartment with Atlantic views.",
    image: {
      url: "https://images.unsplash.com/photo-1506976785307-8732e854ad03",
      filename: "listingname",
    },
    price: 8800,
    location: "Lisbon",
    country: "Portugal"
  },
  {
    title: "Mexico Beach House",
    description: "Colorful beachfront house with pool.",
    image: {
      url: "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
      filename: "listingname"
    },
    price: 7600,
    location: "Cancun",
    country: "Mexico"
  },
  {
    title: "Hawaii Ocean Bungalow",
    description: "Relax in tropical paradise.",
    image: {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      filename: "listingname"
    },
    price: 15000,
    location: "Maui",
    country: "USA"
  },
  {
    title: "Berlin Urban Loft",
    description: "Industrial-style loft in vibrant city.",
    image: {
        url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
        filename: "listingname"
    },
    price: 8900,
    location: "Berlin",
    country: "Germany"
},
{
    title: "Moscow Luxury Apartment",
    description: "Elegant apartment in central Moscow.",
    image: {
        url: "https://images.unsplash.com/photo-1494526585095-c41746248156",
        filename: "listingname"
    },
    price: 9100,
    location: "Moscow",
    country: "Russia"
},
{
    title: "Beijing City Stay",
    description: "Modern apartment in bustling Beijing.",
    image: {
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        filename: "listingname"
    },
    price: 7000,
    location: "Beijing",
    country: "China"
},
{
    title: "Bangkok Riverside Hotel",
    description: "Luxury stay along Chao Phraya river.",
    image: {
        url: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade",
        filename: "listingname"
    },
    price: 6500,
    location: "Bangkok",
    country: "Thailand"
},
{
    title: "Singapore Marina Stay",
    description: "Skyline views in modern luxury hotel.",
    image: {
        url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
        filename: "listingname"
    },
    price: 14000,
    location: "Singapore",
    country: "Singapore"
},
{
    title: "Delhi Heritage Haveli",
    description: "Experience royal Indian heritage stay.",
    image: {
        url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
        filename: "listingname"
    },
    price: 5000,
    location: "Delhi",
    country: "India"
},
{
    title: "Kashmir Houseboat",
    description: "Stay on Dal Lake with scenic views.",
    image: {
        url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
        filename: "listingname"
    },
    price: 6200,
    location: "Srinagar",
    country: "India"
},
{
    title: "Nepal Mountain Lodge",
    description: "Perfect base for trekking adventures.",
    image: {
        url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
        filename: "listingname"
    },
    price: 4300,
    location: "Pokhara",
    country: "Nepal"
},
{
    title: "Sri Lanka Beach Resort",
    description: "Golden beaches and luxury vibes.",
    image: {
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        filename: "listingname"
    },
    price: 6800,
    location: "Galle",
    country: "Sri Lanka"
},
{
    title: "Malaysian Rainforest Villa",
    description: "Stay deep in lush rainforest and connect with nature in this eco-friendly retreat.",
    image: {
        url: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        filename: "listingname",
    },
    price: 7200,
    location: "Langkawi",
    country: "Malaysia"
},
];



module.exports = { data: sampleListings };