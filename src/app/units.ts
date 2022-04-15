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
    unit_id: number,
    // unit_key: string,
    unit_val_pres: number,
    unit_val_past: number,
    unit_type: string
}



export const units = [
    {
        id: 1,
        name: "moles",
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
            "m3": 1,
            "liter/dm3": 10 ** (-3),
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
            "kilogram": 1,
            "centner": 10 ** (-2),
            "gram": 10 ** (-3),
            "pound": 2.2046226218488 * (10 ** (-6)),
            "milligram": 10 ** (-6),
            "microgram": 10 ** (-9),
            "nanogram": 10 ** (-12)
          }
    },
    {
        id: 6,
        name: "density",
        unitsRecord: {
            "kg/m3": 1,
            "g/m3": 10 ** (-3),
            "g/dm3": 10 ** (-6),
            "mg/dm3": 10 ** (-9),
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
    }
]
