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
            "dmol": 10 ** (-1),
            "cmol": 10 ** (-2),
            "mmol": 10 ** (-3),
            "µmol": 10 ** (-6),
            "nmol": 10 ** (-9),
            "pmol": 10 ** (-12),
            "fmol": 10 ** (-15),
            "amol": 10 ** (-18),
            "zmol": 10 ** (-21),
            "ymol": 10 ** (-24),
          }
    },
    {
        id: 2,
        name: "volume",
        unitsRecord: {
            "m3": 10 ** 3,
            "L": 1,
            "cm3": 10 ** (-6),
            "mm3": 10 ** (-9),
          }
    },
    {
        id: 3,
        name: "molar concentration",
        unitsRecord: {
            "mol": 1,
            "dmol": 10 ** (-1),
            "cmol": 10 ** (-2),
            "mmol": 10 ** (-3),
            "µmol": 10 ** (-6),
            "nmol": 10 ** (-9),
            "pmol": 10 ** (-12),
            "fmol": 10 ** (-15),
            "amol": 10 ** (-18),
            "zmol": 10 ** (-21),
            "ymol": 10 ** (-24),
            "/m3": 10 ** 3,
            "/L": 1,
            "/mL": 10 ** (-3),
            "/µL": 10 ** (-6),
          }
    },
    {
        id: 4,
        name: "equivalent concentration",
        unitsRecord: {
            "eq": 1,
            "meq": 10 ** (-3),
            "µeq": 10 ** (-6),
            "neq": 10 ** (-9),
            "peq": 10 ** (-12),
            "feq": 10 ** (-15),
            "aeq": 10 ** (-18),
            "zeq": 10 ** (-21),
            "yeq": 10 ** (-24),
            "/m3": 10 ** 3,
            "/L": 1,
            "/mL": 10 ** (-3),
            "/µL": 10 ** (-6),
          }
    },
    {
        id: 5,
        name: "mass",
        unitsRecord: {
            "kg": 10 ** 3,
            "ctr": 10,
            "g": 1,
            "cg": 10 ** (-2),
            "lb": 2.2046226218488 * (10 ** (-3)),
            "mg": 10 ** (-3),
            "µg": 10 ** (-6),
            "ng": 10 ** (-9),
          }
    },
    {
        id: 6,
        name: "density",
        unitsRecord: {
            "kg": 10 ** 3,
            "ctr": 10,
            "g": 1,
            "cg": 10 ** (-2),
            "lb": 2.2046226218488 * (10 ** (-3)),
            "mg": 10 ** (-3),
            "µg": 10 ** (-6),
            "ng": 10 ** (-9),
            "/m3": 10 ** 3,
            "/L": 1,
            "/mL": 10 ** (-3),
            "/µL": 10 ** (-6)
          }
    },
    {
        id: 7,
        name: "length",
        unitsRecord: {
            "m": 1,
            "dm": 10 ** (-1),
            "cm": 10 ** (-2),
            "mm": 10 ** (-3),
            "µm": 10 ** (-6),
            "nm": 10 ** (-9),
            "å": 10 ** (-10),
            "pm" : 10 ** (-12)
          }
    },
    {
        id: 8,
        name: "molar mass",
        unitsRecord: {
            "kg": 10 ** 3,
            "ctr": 10,
            "g": 1,
            "mg": 10 ** (-3),
            "/mol": 1,
            "/mmol": 10 ** (-3),
          }
    }
]
