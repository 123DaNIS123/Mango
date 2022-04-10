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
            "mol/m3": 1,
            "mol/L (M)": 10 ** (-3),
            "mmol/L": 10 ** (-6),
            "micromol/L": 10 ** (-9),
            "nanomol/L": 10 ** (-12),
            "picomol/L": 10 ** (-15),
            "femtomol/L": 10 ** (-18),
            "attomol/L": 10 ** (-21),
            "zeptomol/L": 10 ** (-24),
            "yoctomol/L": 10 ** (-27),
          }
    },
    {
        id: 4,
        name: "equivalent concentration",
        unitsRecord: {
            "eq/m3": 1,
            "eq/L (N)": 10 ** (-3),
            "milieq/L": 10 ** (-6),
            "microeq/L": 10 ** (-9),
            "nanoeq/L": 10 ** (-12),
            "picoeq/L": 10 ** (-15),
            "femtoeq/L": 10 ** (-18),
            "attoeq/L": 10 ** (-21),
            "zeptoeq/L": 10 ** (-24),
            "yoctoeq/L": 10 ** (-27),
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
