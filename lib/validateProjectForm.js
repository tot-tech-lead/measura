import * as Yup from "yup";

export default function projectValidationSchema(serviceIDs, additionalServiceIDs) {
    return Yup.object({
        "address": Yup.string()
            .min(3, "Адреса повинна містити щонайменше 3 символи.")
            .max(255, "Адреса може містити максимум 255 символів."),
        "area": Yup.number()
            .min(1, "Площа повинна бути більше або дорівнювати 1.")
            .required("Будь ласка, вкажіть площу."),
        "cover": Yup.string(),
        "description": Yup.string()
            .max(255, "Опис може містити максимум 255 символів."),
        "gluePrice": Yup.number()
            .min(1, "Ціна клею повинна бути більше або дорівнювати 1.")
            .required("Будь ласка, вкажіть вартість клею."),
        "glueWeight": Yup.number()
            .min(1, "Маса мішка клею повинна бути більше або дорівнювати 1.")
            .required("Будь ласка, вкажіть масу мішка клею."),
        "name": Yup.string()
            .min(3, "Назва повинна містити щонайменше 3 символи.")
            .max(255, "Назва може містити максимум 255 символів.")
            .required("Будь ласка, вкажіть назву проєкту."),
        "services": Yup.array(
            Yup.string()
                .uuid("ID послуги має бути дійсним UUID.")
                .oneOf(additionalServiceIDs, "Така послуга не існує")
        ),
        "tarif": Yup.string()
            .uuid("ID тарифу має бути дійсним UUID.")
            .required("Будь ласка, вкажіть тариф.")
            .oneOf(serviceIDs, "Такий тариф не існує")
        ,
        "tileCostForMeterSq": Yup.number()
            .min(1, "Ціна плитки за м² повинна бути більше або дорівнювати 1.")
            .required("Будь ласка, вкажіть ціну плитки за м²."),
        "tileHeight": Yup.number()
            .min(1, "Висота плитки повинна бути більше або дорівнювати 1.")
            .required("Будь ласка, вкажіть висоту плитки."),
        "tileWidth": Yup.number()
            .min(1, "Ширина плитки повинна бути більше або дорівнювати 1.")
            .required("Будь ласка, вкажіть ширину плитки.")
    });

}

export function createdProjectValidationSchema(serviceIDs, additionalServiceIDs) {
    return Yup.object({
        "id": Yup.string()
            .uuid("ID проекту має бути дійсним UUID.")
            .required("ID проекту повинен бути заданий"),
        "address": Yup.string()
            .min(3, "Адреса повинна містити щонайменше 3 символи.")
            .max(255, "Адреса може містити максимум 255 символів."),
        "area": Yup.number()
            .min(1, "Площа повинна бути більше або дорівнювати 1.")
            .required("Будь ласка, вкажіть площу."),
        "cover": Yup.string(),
        "description": Yup.string()
            .max(255, "Опис може містити максимум 255 символів."),
        "gluePrice": Yup.number()
            .min(1, "Ціна клею повинна бути більше або дорівнювати 1.")
            .required("Будь ласка, вкажіть вартість клею."),
        "glueWeight": Yup.number()
            .min(1, "Маса мішка клею повинна бути більше або дорівнювати 1.")
            .required("Будь ласка, вкажіть масу мішка клею."),
        "name": Yup.string()
            .min(3, "Назва повинна містити щонайменше 3 символи.")
            .max(255, "Назва може містити максимум 255 символів.")
            .required("Будь ласка, вкажіть назву проєкту."),
        "services": Yup.array(
            Yup.string()
                .uuid("ID послуги має бути дійсним UUID.")
                .oneOf(additionalServiceIDs, "Така послуга не існує")
        ),
        "tarif": Yup.string()
            .uuid("ID тарифу має бути дійсним UUID.")
            .required("Будь ласка, вкажіть тариф.")
            .oneOf(serviceIDs, "Такий тариф не існує")
        ,
        "tileCostForMeterSq": Yup.number()
            .min(1, "Ціна плитки за м² повинна бути більше або дорівнювати 1.")
            .required("Будь ласка, вкажіть ціну плитки за м²."),
        "tileHeight": Yup.number()
            .min(1, "Висота плитки повинна бути більше або дорівнювати 1.")
            .required("Будь ласка, вкажіть висоту плитки."),
        "tileWidth": Yup.number()
            .min(1, "Ширина плитки повинна бути більше або дорівнювати 1.")
            .required("Будь ласка, вкажіть ширину плитки.")
    });

}