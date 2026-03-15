Landing page:
“Design a modern, data-driven web app for ‘Sri Lanka Tourism Insights’ that helps investors explore tourism arrival trends and test hotel investment ideas. The visual style should feel professional, minimal, and analytic, with a focus on charts and clear hierarchy. Use a clean sans-serif font, lots of white space, and a blue/teal accent palette.”

1. Global layout and navigation
“Create a desktop web layout with:

Top navigation bar: logo (Sri Lanka Tourism Insights), links: Home, Analytics, Investment Simulator, About, Sign in, Sign up.

Persistent primary CTA button in the header: ‘Try Investment Simulator’.

Consistent grid and spacing system, responsive-friendly.”

2. Authentication (Sign in / Sign up)
“Design two auth screens:

Sign in:

Simple centered card on a dimmed background.

Fields: Email, Password, ‘Remember me’ checkbox.

Buttons: ‘Sign in’ (primary), ‘Sign in with Google’ (secondary), text link ‘Create an account’.

Error state under fields for validation messages.

Sign up:

Similar card layout.

Fields: Full Name, Email, Password, Confirm Password, ‘I agree to terms’ checkbox.

Buttons: ‘Create account’ (primary), ‘Sign up with Google’ (secondary).

Small copy explaining benefits: ‘Save scenarios, export reports, and track investment ideas.’”

3. Home / Dashboard (Tourism overview)
“Design a main dashboard page focused on Sri Lanka tourism arrivals:

Hero section:

Title: ‘Sri Lanka Tourism Arrivals & Investment Insights’.

Subtext: short explanation: ‘Explore past arrivals, forecast future demand, and test hotel investments.’

CTA buttons: ‘View Analytics’ and ‘Run Investment Scenario’.

Charts section:

Large line chart card: ‘Sri Lanka Tourist Arrivals by Year’ (historical + future forecast years).

Include a legend for ‘Actual’ and ‘Forecast’.

Time range filter: dropdown or pill buttons (5y, 10y, All).

Secondary chart card: ‘Regional Demand Overview’.

Bar chart or map-like visualization breaking demand by region (e.g., Colombo, Kandy, Galle, Ella).

Filter chips for region type (Coastal, Cultural, Nature).

Key metrics strip:

Cards showing KPIs: ‘Total arrivals (last year)’, ‘Forecast CAGR’, ‘Top region’, ‘Avg occupancy’ (placeholder numbers).

Each card has an icon and short label.

Side panel:

Simple filters: Year range slider, Region multi-select dropdown.

Apply/Reset buttons.”

4. Regional demand details page
“Design an Analytics detail page focusing on regions:

Layout:

Left: filter panel.

Right: main content area with charts and tables.

Filters:

Year range (slider or dual input).

Region dropdown or multi-select chips.

Traveler segment filter (Couples, Families, Business, Solo).

Content:

Section: ‘Regional Demand by Year’ – multi-line chart by selected regions.

Section: ‘Regional Demand Breakdown’ – bar chart comparing regions in a selected year.

Table: ‘Regional Metrics’ with columns: Region, Demand Index, Avg ADR, Occupancy, Seasonality (high/medium/low). Each row has small status badges.”

5. Investment Simulator – Input page
“Design an ‘Investment Simulator’ page where users configure a hotel investment idea.

Layout:

Step-like form in a card, with progress indicator: Step 1: Inputs → Step 2: Results.

Title: ‘Test Your Hotel Investment Idea’.

Form fields:

Year (dropdown or numeric input for target opening year).

Area (dropdown for region/area, e.g., Colombo, Galle, Kandy).

Property Type (preset: Hotel; allow dropdown for future expansion like ‘Resort’, ‘Boutique’, but selected is Hotel).

Star Level (dropdown: 3-star, 4-star, 5-star, Boutique).

Price per Night (numeric input in USD, with ‘per night’ label).

Facilities (multi-select chips or checkboxes):

Options: Pool, Spa, Gym, Restaurant, Bar, Meeting Rooms, Beachfront, Free Wi-Fi, Parking, Kids Area, etc.

Optional toggles: ‘Target international guests’, ‘Target domestic guests’.

Form UX:

Group fields into logical sections: ‘Location & Timing’, ‘Property Profile’, ‘Pricing & Facilities’.

Primary action button at bottom: ‘Run Analysis’.

Secondary action: ‘Reset inputs’.

Simple helper text beneath groups (e.g., ‘Facilities impact perceived value and demand score’).”

6. Investment Results page
“Design the ‘Investment Results’ page that appears after clicking ‘Run Analysis’.

Top summary:

Title: ‘Investment Results for [Year] – [Area] – [Star level]’.

Two highlighted summary cards:

‘Overall Profitability Score’ (0–100 gauge or large numeric badge, colored scale).

‘Risk Level’ (Low/Medium/High with icon and color).

Section: Country & Area Demand

Chart 1: ‘Country Demand in [Year]’ – line or bar showing relative demand index compared to previous years.

Chart 2: ‘Area Demand vs Country Average’ – side-by-side bar chart or radial chart.

Section: Area Hotel Strengths & Weaknesses

Two-column layout:

Left card: ‘Strengths’ – bullet list (e.g., ‘High future demand’, ‘Strong mid-range segment’, ‘Popular with couples’).

Right card: ‘Weaknesses’ – bullet list (e.g., ‘High competition in 4-star segment’, ‘Seasonal demand dependency’).

Add simple icons for strengths (up arrows, checkmarks) and weaknesses (warnings, down arrows).

Section: Facilities & Positioning

Small table or chip list mapping chosen facilities to their impact:

Columns: Facility, Impact on Demand (High/Medium/Low), Notes (short 1-line text).

A short paragraph block titled ‘Positioning Summary’ with 2–3 lines of descriptive text about the concept.

Section: Recommendations & Suggestions

Card titled ‘Actionable Suggestions’:

List items like:

‘Consider adjusting price per night to X–Y range.’

‘Add/Remove specific facilities to better match regional demand.’

‘Best target segments for this concept: [segments].’

Add a small ‘Scenario notes’ text area (for user to type).

Bottom actions:

Primary button: ‘Download PDF Report’.

Secondary button: ‘Try Another Scenario’.

Tertiary link: ‘Share scenario’ (for future; greyed or normal).”

7. PDF export state
“Design a simple modal or toast indicating export:

Modal title: ‘Export Investment Report’.

Text: ‘Your report will include charts, demand analysis, SWOT-style summary, and profitability score.’

Buttons: ‘Download PDF’ (primary) and ‘Cancel’.

Include a small preview thumbnail of a PDF-like page showing a cover with hotel name, year, and score.”

8. Mobile considerations
“Add mobile versions for:

Home dashboard (charts stacked vertically).

Investment Simulator form (single column).

Investment Results (summary cards first, charts and lists below).
Use bottom sticky bar for the main action buttons (‘Run Analysis’, ‘Download PDF’) on mobile.”