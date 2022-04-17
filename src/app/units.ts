export interface UnitsList {
    id: number,
    name: string,
    unitsRecord: Record<string, number>
}

// export interface SelectedNumber {
//     id: number,
//     unitsRecord: Record<string, number>
// }

export interface ex_num {
    id: number,
    val: number,
    firstval: number,
    disp: string,
    // unit_key: string,
    unit_val_pres: number,
    unit_val_past: number,
    unit_type: string,
    param_name: string,
    status: string,
    unit_id: number
}



export const units = [
    {
        id: 1,
        name: "amount of substance",
        unitsRecord: {
            "mol": 1,
            "decimol": 10 ** (-1),
            "cantimol": 10 ** (-2),
            "millimol": 10 ** (-3),
            "micromol": 10 ** (-6),
          }
    },
    {
        id: 2,
        name: "volume",
        unitsRecord: {
            "m3": 10 ** 3,
            "L (dm3)": 1,
            "cm3": 10 ** (-6),
            "mm3": 10 ** (-9),
          }
    },
    {
        id: 3,
        name: "molar concentration",
        unitsRecord: {
            "mol": 1,
            "mmol": 10 ** 3,
            "micromol": 10 ** 6,
            "nanomol": 10 ** 9,
            "picomol": 10 ** 12,
            "femtomol": 10 ** 15,
            "attomol": 10 ** 18,
            "zeptomol": 10 ** 21,
            "yoctomol": 10 ** 24,
            "/m3": 10 ** 3,
            "/L (dm3)": 1,
            "/mL (cm3)": 10 ** (-3),
            "/microL (mm3)": 10 ** (-6),
          }
    },
    {
        id: 4,
        name: "equivalent concentration",
        unitsRecord: {
            "eq": 1,
            "meq": 10 ** 3,
            "microeq": 10 ** 6,
            "nanoeq": 10 ** 9,
            "picoeq": 10 ** 12,
            "femtoeq": 10 ** 15,
            "attoeq": 10 ** 18,
            "zeptoeq": 10 ** 21,
            "yoctoeq": 10 ** 24,
            "/m3": 10 ** 3,
            "/L (dm3)": 1,
            "/mL (cm3)": 10 ** (-3),
            "/microL (mm3)": 10 ** (-6),
          }
    },
    {
        id: 5,
        name: "mass",
        unitsRecord: {
            "kilogram": 10 ** 3,
            "centner": 10,
            "gram": 1,
            "pound": 2.2046226218488 * (10 ** (-3)),
            "milligram": 10 ** (-3),
            "microgram": 10 ** (-6),
            "nanogram": 10 ** (-9),
          }
    },
    {
        id: 6,
        name: "density",
        unitsRecord: {
            "kg": 10 ** (-3),
            "centner": 10 * (-1),
            "g": 1,
            "cantigram": 100,
            "mg": 10 ** 3,
            "microgram": 10 ** 6,
            "nanogram": 10 ** 9,
            "/m3": 10 ** 3,
            "/L (dm3)": 1,
            "/mL (cm3)": 10 ** (-3),
            "/microL (mm3)": 10 ** (-6)
          }
    },
    {
        id: 7,
        name: "length",
        unitsRecord: {
            "meter": 1,
            "decimeter": 10 ** (-1),
            "cantimeter": 10 ** (-2),
            "millimeter": 10 ** (-3),
            "micrometer": 10 ** (-6),
            "nanometer": 10 ** (-9),
            "angstrom": 10 ** (-10),
            "picometer" : 10 ** (-12)
          }
    },
    {
        id: 8,
        name: "molar mass",
        unitsRecord: {
            "kg": 10 ** (-3),
            "centner": 10 * (-1),
            "g": 1,
            "mg": 10 ** 3,
            "/mol": 1,
            "/mmol": 10 ** (-3),
          }
    }
]
