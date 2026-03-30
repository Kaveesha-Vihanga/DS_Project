// Sample data for Invest Ceylon Tourism Analytics

export const touristArrivals = [
  { year: 2016, arrivals: 2050000, isForecast: false },
  { year: 2017, arrivals: 2116000, isForecast: false },
  { year: 2018, arrivals: 2333000, isForecast: false },
  { year: 2019, arrivals: 1913000, isForecast: false },
  { year: 2020, arrivals: 507000, isForecast: false },
  { year: 2021, arrivals: 194000, isForecast: false },
  { year: 2022, arrivals: 719000, isForecast: false },
  { year: 2023, arrivals: 1488000, isForecast: false },
  { year: 2024, arrivals: 2100000, isForecast: false },
  { year: 2025, arrivals: 2450000, isForecast: false },
  { year: 2026, arrivals: 2800000, isForecast: true },
  { year: 2027, arrivals: 3100000, isForecast: true },
  { year: 2028, arrivals: 3400000, isForecast: true },
  { year: 2029, arrivals: 3700000, isForecast: true },
  { year: 2030, arrivals: 4000000, isForecast: true },
];

export const sourceMarkets = [
  { country: 'India', arrivals: 528000, share: 22, flag: '🇮🇳' },
  { country: 'China', arrivals: 360000, share: 15, flag: '🇨🇳' },
  { country: 'United Kingdom', arrivals: 288000, share: 12, flag: '🇬🇧' },
  { country: 'Germany', arrivals: 192000, share: 8, flag: '🇩🇪' },
  { country: 'Australia', arrivals: 168000, share: 7, flag: '🇦🇺' },
  { country: 'France', arrivals: 144000, share: 6, flag: '🇫🇷' },
  { country: 'USA', arrivals: 120000, share: 5, flag: '🇺🇸' },
  { country: 'Maldives', arrivals: 96000, share: 4, flag: '🇲🇻' },
  { country: 'Russia', arrivals: 84000, share: 3.5, flag: '🇷🇺' },
  { country: 'Japan', arrivals: 72000, share: 3, flag: '🇯🇵' },
];

export const regionalData = [
  { region: 'Western (Colombo)', percentage: 32, visitors: 768000, type: 'Urban' },
  { region: 'Southern (Galle)', percentage: 18, visitors: 432000, type: 'Coastal' },
  { region: 'Central (Kandy)', percentage: 15, visitors: 360000, type: 'Cultural' },
  { region: 'Uva (Ella)', percentage: 8, visitors: 192000, type: 'Nature' },
  { region: 'Sabaragamuwa', percentage: 7, visitors: 168000, type: 'Nature' },
  { region: 'North Western', percentage: 6, visitors: 144000, type: 'Coastal' },
  { region: 'North Central', percentage: 5, visitors: 120000, type: 'Cultural' },
  { region: 'Northern (Jaffna)', percentage: 5, visitors: 120000, type: 'Cultural' },
  { region: 'Eastern (Trincomalee)', percentage: 4, visitors: 96000, type: 'Coastal' },
];

export const monthlyArrivals2024 = [
  { month: 'Jan', arrivals: 180000 },
  { month: 'Feb', arrivals: 165000 },
  { month: 'Mar', arrivals: 175000 },
  { month: 'Apr', arrivals: 160000 },
  { month: 'May', arrivals: 145000 },
  { month: 'Jun', arrivals: 155000 },
  { month: 'Jul', arrivals: 195000 },
  { month: 'Aug', arrivals: 205000 },
  { month: 'Sep', arrivals: 170000 },
  { month: 'Oct', arrivals: 185000 },
  { month: 'Nov', arrivals: 195000 },
  { month: 'Dec', arrivals: 220000 },
];

export const monthlyArrivals2025 = [
  { month: 'Jan', arrivals: 195000 },
  { month: 'Feb', arrivals: 178000 },
  { month: 'Mar', arrivals: 189000 },
  { month: 'Apr', arrivals: 174000 },
  { month: 'May', arrivals: 162000 },
  { month: 'Jun', arrivals: 171000 },
  { month: 'Jul', arrivals: 215000 },
  { month: 'Aug', arrivals: 228000 },
  { month: 'Sep', arrivals: 188000 },
  { month: 'Oct', arrivals: 205000 },
  { month: 'Nov', arrivals: 218000 },
  { month: 'Dec', arrivals: 245000 },
];

export const tourismAttractions = [
  { name: 'Sigiriya Rock Fortress', description: 'Ancient rock fortress and UNESCO World Heritage Site', visitors: '450K/year' },
  { name: 'Temple of the Tooth', description: 'Sacred Buddhist temple in Kandy', visitors: '380K/year' },
  { name: 'Galle Fort', description: 'Historic Dutch colonial fort on the coast', visitors: '520K/year' },
  { name: 'Yala National Park', description: 'Premier wildlife safari destination', visitors: '285K/year' },
  { name: 'Ella Rock & Nine Arch Bridge', description: 'Scenic hill country attractions', visitors: '340K/year' },
  { name: 'Dambulla Cave Temple', description: 'Ancient Buddhist cave temple complex', visitors: '310K/year' },
  { name: 'Mirissa Beach', description: 'Beautiful beach and whale watching spot', visitors: '265K/year' },
  { name: 'Nuwara Eliya Tea Country', description: 'Picturesque tea plantations in the hills', visitors: '295K/year' },
];

export const keyMetrics = {
  arrivals2025: '2.45M',
  forecastGrowth: '12.5%',
  revenue2025: '$4.2B',
  topDistrict: 'Colombo',
};

export const whyInvestReasons = [
  {
    title: 'Rapid Growth Market',
    description: 'Tourism recovering strongly with 12.5% CAGR projected through 2030',
    icon: 'TrendingUp',
  },
  {
    title: 'Strategic Location',
    description: 'Gateway between East and West, accessible to 2 billion people within 4 hours',
    icon: 'MapPin',
  },
  {
    title: 'UNESCO World Heritage',
    description: '8 UNESCO sites attracting cultural and heritage tourists',
    icon: 'Landmark',
  },
  {
    title: 'Diverse Offerings',
    description: 'Beaches, wildlife, tea country, ancient ruins - something for every traveler',
    icon: 'Palmtree',
  },
  {
    title: 'Government Incentives',
    description: 'Tax holidays and investment incentives for tourism infrastructure',
    icon: 'BadgeDollarSign',
  },
  {
    title: 'Competitive Costs',
    description: 'Lower operational costs compared to Maldives and Southeast Asian competitors',
    icon: 'PiggyBank',
  },
];

export const analyticsData = {
  occupancyRates: [
    { month: 'Jan', rate: 72 },
    { month: 'Feb', rate: 68 },
    { month: 'Mar', rate: 70 },
    { month: 'Apr', rate: 65 },
    { month: 'May', rate: 58 },
    { month: 'Jun', rate: 62 },
    { month: 'Jul', rate: 78 },
    { month: 'Aug', rate: 82 },
    { month: 'Sep', rate: 66 },
    { month: 'Oct', rate: 74 },
    { month: 'Nov', rate: 77 },
    { month: 'Dec', rate: 85 },
  ],
  averageDailyRate: [
    { region: 'Western', adr: 125 },
    { region: 'Southern', adr: 145 },
    { region: 'Central', adr: 95 },
    { region: 'Uva', adr: 80 },
    { region: 'Eastern', adr: 110 },
  ],
  revenueByQuarter: [
    { quarter: 'Q1 2024', revenue: 950 },
    { quarter: 'Q2 2024', revenue: 820 },
    { quarter: 'Q3 2024', revenue: 1150 },
    { quarter: 'Q4 2024', revenue: 1280 },
    { quarter: 'Q1 2025', revenue: 1050 },
  ],
};

// Province data for Regional Demand page
export const provinceData = [
  { province: "Central", total_visitors: 963553, revenue_M: 2386.29, foreign_pct: 34.6 },
  { province: "Southern", total_visitors: 742830, revenue_M: 2540.11, foreign_pct: 53.7 },
  { province: "North Central", total_visitors: 449801, revenue_M: 1219.87, foreign_pct: 72.3 },
  { province: "Western", total_visitors: 122761, revenue_M: 68.05, foreign_pct: 45.5 },
  { province: "Northern", total_visitors: 115121, revenue_M: 15.84, foreign_pct: 6.1 },
  { province: "North Western", total_visitors: 99686, revenue_M: 195.58, foreign_pct: 33.1 },
  { province: "Eastern", total_visitors: 66612, revenue_M: 59.35, foreign_pct: 20.2 },
  { province: "Uva", total_visitors: 50347, revenue_M: 36.69, foreign_pct: 79.5 },
  { province: "Sabaragamuwa", total_visitors: 39659, revenue_M: 15.41, foreign_pct: 31.7 }
];

// Hotel investment trends 2010-2025
export const hotelInvestmentData = [
  {year:2010, received:55, approved:3, received_investment:958.87, approved_investment:17.17},
  {year:2011, received:153, approved:44, received_investment:1157.23, approved_investment:251.57},
  {year:2012, received:72, approved:57, received_investment:576.24, approved_investment:313.22},
  {year:2013, received:60, approved:36, received_investment:1124.295, approved_investment:370.64},
  {year:2014, received:68, approved:42, received_investment:957.79, approved_investment:426.398},
  {year:2015, received:59, approved:36, received_investment:430.98, approved_investment:889.945},
  {year:2016, received:76, approved:41, received_investment:590.02, approved_investment:145.633},
  {year:2017, received:96, approved:45, received_investment:314.82, approved_investment:379.77},
  {year:2018, received:141, approved:44, received_investment:935.06, approved_investment:159.724},
  {year:2019, received:132, approved:57, received_investment:190.71, approved_investment:755.73},
  {year:2020, received:54, approved:24, received_investment:236.06, approved_investment:95.47},
  {year:2021, received:45, approved:30, received_investment:116.55, approved_investment:103.985},
  {year:2022, received:43, approved:22, received_investment:65.574, approved_investment:36.833},
  {year:2023, received:68, approved:34, received_investment:241.142, approved_investment:170.126},
  {year:2024, received:76, approved:30, received_investment:160.729, approved_investment:41.723},
  {year:2025, received:51, approved:22, received_investment:169.096, approved_investment:53.566},
];

// Mock scoring result
export const MOCK_RESULT = {
  investment_score_0_100: 72.4,
  topsis_base_closeness_0_1: 0.68,
  gap_adjustment: 0.043,
  drivers: {
    future_demand_fit: 0.82,
    price_fit_vs_median: 0.61,
    facility_completeness: 0.75,
    gap_alignment: 0.58,
    surplus_risk: 0.22,
    area_median_price: 95
  },
  future_demand_pct: 86,
  expected_revenue_index: 0.74,
  regional_demand_pct: 82
};

// Sri Lankan districts with main areas
export const districtData = {
  "Colombo": ["Colombo City", "Mount Lavinia", "Negombo", "Dehiwala"],
  "Gampaha": ["Negombo", "Katunayake", "Gampaha", "Minuwangoda"],
  "Kalutara": ["Kalutara", "Beruwala", "Wadduwa", "Panadura"],
  "Kandy": ["Kandy City", "Peradeniya", "Gampola", "Katugastota"],
  "Matale": ["Matale", "Dambulla", "Sigiriya", "Nalanda"],
  "Nuwara Eliya": ["Nuwara Eliya", "Nanu Oya", "Hatton", "Talawakele"],
  "Galle": ["Galle", "Hikkaduwa", "Unawatuna", "Bentota"],
  "Matara": ["Matara", "Mirissa", "Weligama", "Dondra"],
  "Hambantota": ["Hambantota", "Tangalle", "Tissamaharama", "Kataragama"],
  "Jaffna": ["Jaffna", "Point Pedro", "Chavakachcheri", "Valvettithurai"],
  "Kilinochchi": ["Kilinochchi", "Pallai", "Poonakary"],
  "Mannar": ["Mannar", "Madhu"],
  "Vavuniya": ["Vavuniya", "Cheddikulam"],
  "Mullaitivu": ["Mullaitivu", "Puthukudiyiruppu"],
  "Batticaloa": ["Batticaloa", "Kalkudah", "Passikudah"],
  "Ampara": ["Ampara", "Arugam Bay", "Kalmunai"],
  "Trincomalee": ["Trincomalee", "Nilaveli", "Uppuveli"],
  "Kurunegala": ["Kurunegala", "Kuliyapitiya", "Narammala"],
  "Puttalam": ["Puttalam", "Chilaw", "Kalpitiya"],
  "Anuradhapura": ["Anuradhapura", "Mihintale", "Kekirawa"],
  "Polonnaruwa": ["Polonnaruwa", "Hingurakgoda", "Medirigiriya"],
  "Badulla": ["Badulla", "Ella", "Bandarawela", "Haputale"],
  "Monaragala": ["Monaragala", "Wellawaya", "Buttala"],
  "Ratnapura": ["Ratnapura", "Embilipitiya", "Balangoda"],
  "Kegalle": ["Kegalle", "Mawanella", "Rambukkana"]
};

// Mock facility coverage data
export const facilityGapData = [
  { facility: "WiFi", coverage: 95 },
  { facility: "AC", coverage: 88 },
  { facility: "Restaurant", coverage: 76 },
  { facility: "Pool", coverage: 42 },
  { facility: "Gym", coverage: 25 },
  { facility: "Spa", coverage: 18 },
];
