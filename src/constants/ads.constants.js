import i18n from "../i18n";

export const adTypes = [
    "Bilboard",
    "Facade",
    "CLP",
    "BusStop",
    "Giantboard",
    "AirportMall",
    "Towerboard",
    "Led",
    "Megalight",
    "Metro",
    "Raklet",
    "Totem",
    "RoadsideLed",
    "RoadPoster",
    "PedestrianBridge",
    "Wayfinding"
];

export const published = [
    "Yayında Değil",
    "Yayında",

];

export const ownerTypes = [
    "owner",
    "rent",
];

export const minPeriod = [
    "oneMonthly",
    "twoMonthly",
    "treeMonthly",
    "fourMonthly",
    "fiveMonthly",
    "sixMonthly",
    "sevenMonthly",
    "eightMonthly",
    "nineMonthly",
    "teenMonthly",
    "elevenMonthly",
    "twentyMonthly",
];
export const countType = [
    "unique",
    "multiple",
];

export const timeLine = [
    "1",
    "2",
];

export const availability = [
    "available",
    "rented",
];

export const paymentType = [
    "advance",
    "maturity",
];

export const frequency = [
    "15",
    "30",
];


export const adSpaceTypes = [
    "bilboard",
    "set",
];

export const adSpaceCategories = [
    "multiple",
    "single",
];

export const fullFrequencyOptions = [
    "bilboard",
    "set",
];

export const faceCountOptions = [
    "single",
    "multiple",
];

export const timeSlotOptions = [
    "7/24",
    "12/24",
];

export const rentalPeriodOptions = [
    "monthly",
    "weekly",
    "daily",
];

export const continuityOptions = [
    "temporary",
    "permanent",
];

export const implementerOptions = [
    "advertiser",
    "agency",
];

export const saleTypes = [
    "fixedPrice",
    "offer",
];

export const serviceTypes = [
    "mandatory",
    "optional",
];

export const installmentOptions = [
    "50PercentDown",
    "25PercentDown",
    "fullPayment",
];

export const inventoryDocumentName = {
    "yetkiBelgesi": "yetkiBelgesi",
    "tapuBelgesi": "tapuBelgesi",
};

export const evaluationCriteria=[
    {name: "pedestrianDensity", label: i18n.t("adsCriteria.pedestrianDensity"), value: 70},
    {name: "vehicleDensity", label: i18n.t("adsCriteria.vehicleDensity"), value: 70},
    {name: "neighborhoodIncomeLevel", label: i18n.t("adsCriteria.neighborhoodIncomeLevel"), value: 70},
    {name: "visitorIncomeLevel", label: i18n.t("adsCriteria.visitorIncomeLevel"), value: 70},
    {name: "visibility", label: i18n.t("adsCriteria.visibility"), value: 70},
    {name: "popularity", label: i18n.t("adsCriteria.popularity"), value: 70},
];