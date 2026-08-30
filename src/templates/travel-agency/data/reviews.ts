export interface Review {
  id: string
  author: string
  avatar: string
  city: string
  destination: string
  rating: number
  title: string
  body: string
  date: string
  verified: boolean
}

export const reviews: Review[] = [
  {
    id: 'r1', author: 'Arjun Sharma', avatar: 'AS', city: 'Mumbai',
    destination: 'Bali', rating: 5,
    title: 'Best honeymoon we could have imagined!',
    body: 'VoyageAI made our Bali honeymoon absolutely magical. The overwater villa, the Tanah Lot sunset tour, and the couple spa — everything was perfectly arranged. Our travel manager Priya was responsive at all hours.',
    date: '2024-12-10', verified: true,
  },
  {
    id: 'r2', author: 'Deepa Krishnan', avatar: 'DK', city: 'Bangalore',
    destination: 'Kerala', rating: 5,
    title: "God's Own Country lives up to its name",
    body: 'The houseboat experience in Alleppey was simply stunning. Waking up on the backwaters with breakfast and birdsong — priceless. The Munnar tea gardens were breathtaking. Highly recommend this team.',
    date: '2025-01-08', verified: true,
  },
  {
    id: 'r3', author: 'Vikram Rajan', avatar: 'VR', city: 'Delhi',
    destination: 'Switzerland', rating: 5,
    title: 'Jungfraujoch was a dream come true',
    body: 'Standing at 3,454m with Alps in every direction — speechless. VoyageAI handled every detail from rail passes to hotel upgrades. The Glacier Express was the highlight of our European trip.',
    date: '2024-11-22', verified: true,
  },
  {
    id: 'r4', author: 'Sunita Mehta', avatar: 'SM', city: 'Jaipur',
    destination: 'Japan', rating: 5,
    title: 'Japan in cherry blossom season is otherworldly',
    body: 'We visited during sakura season and it was beyond words. Kyoto\'s temples, Fushimi Inari hike, Tokyo\'s energy — everything. VoyageAI gave us local insider tips nobody else would share.',
    date: '2025-01-15', verified: true,
  },
  {
    id: 'r5', author: 'Rajesh Iyer', avatar: 'RI', city: 'Chennai',
    destination: 'Maldives', rating: 5,
    title: 'Maldives is pure heaven — thank you!',
    body: 'The overwater villa experience was everything we dreamed and more. Whale shark snorkelling was the highlight of our lives. VoyageAI got us a complimentary dolphin cruise too — amazing service!',
    date: '2024-10-30', verified: true,
  },
  {
    id: 'r6', author: 'Meera Pillai', avatar: 'MP', city: 'Hyderabad',
    destination: 'Rajasthan', rating: 4,
    title: 'Royal Rajasthan exceeded our expectations',
    body: 'The heritage haveli stays were fantastic. Jaisalmer desert camp under the stars was unforgettable. Minor hiccup with Udaipur hotel room but VoyageAI resolved it immediately. Overall 5-star experience.',
    date: '2025-02-02', verified: true,
  },
]
