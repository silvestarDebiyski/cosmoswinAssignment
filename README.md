# COSMOSWIN and BETFINAL APPS

## How to install and run the apps:
        To install and run the apps just double click the run-dev.bat file inside this directory, but before that make sure you have the following ports free [3000, 3001, 4000]
        run-dev.bat runs npm install to install dependencies and npm run dev which starts the apps Betfinal, cosmoswin and a shared server
            that fetches the users or bonuses and updates the users

        COSMOSWINASSIGNMENT/
            │
            ├── apps/
            │   ├── api/         # backend
            │   └── cosmowin/    # frontend
            │   └── betfinal/    # frontend
            │
            ├── packages/
            │   └── ui/          
            │       └── src/     # Shared components, hooks and business logic
            │
            ├── turbo.json       # TurboRepo configuration
            ├── package.json     # Monorepo root package
            └── README.md       <-- You are here

        To access the apps from the browser follow these links:
        - Betfinal: http://localhost:3000/
        - Cosmoswin: http://localhost:3001/

        You can see the mock data inside .app/api for users and bonuses
        Pick a user from the user-mock-data.json file and use the username value to log in

## How to add new bonuses or users
        If you want to add new data, you will have to directly edit the .json files bonuses-mock-data.json and user-mock-data.json inside .app/api. Not following the current structure will likely lead to errors while using the apps.
            Sructure of users :
                {
                    username: string;
                    depositCount: number;
                    registrationDate: string;
                    country: string;
                    isKYCApproved: boolean;
                    currentBalance: number;
                    language: 'en' | 'ar' | undefined;
                    collectedBonuses?: string[];
                }

            Structure of bonuses :
                {
                    id: string;
                    brand: string;
                    name: LocalizedText;
                    description: {
                        en: string;
                        ar: string;
                    };
                    requiresKYC: boolean;
                    depositCountMin?: number;
                    depositCountMax?: number;
                    registrationWithinLastDays?: number;
                    balanceMustBeZero?: boolean;
                    availableCountries?: string[];
                }
        
    <!-- I would have liked to create a separete app that can add/edit users and bonuses and a PATCH api, but as it stands i will be very pressed for time for the rest of this week  -->

## How to switch between English and Arabic
        After logging in for the first time with a user the default language will be English and it can be swaped for both apps through the dropdown on the upper right corner.
        If the language is changed to arabic the direction of the page will switch and it will be placed on the upper left corner.
        When switching languages the user is updated through a post api that updates the users language preferance, so that they can have the previously selected language persist between login sessions.

## How the deposit feature works:
        Each user has a depositCount and currentBalance.
        When a deposit is made: depositCount is incremented and currentBalance is updated, through a post api that updates the user.
        After user is updated, bonus eligibility is recalculated based on: balance, minimum/maximum number of deposits, registration date, country and KYC status.
        Whether or not KYC status will effect the bonuses shown is up to the configuration of the app which can be found in .app/betfinal/config.tsx and .app/cosmowin/config.tsx for their respective apps
        User balance and deposit count can be viewed on the dashboard page shown directly after log in or navigated to by clicking the house icon on the upper right corner for English or upper left right corner for Arabic.
