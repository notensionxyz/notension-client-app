import { createSlice } from '@reduxjs/toolkit';

const doctorReducer = createSlice({
    name: 'doctorInfo',
    initialState: {
        merchantId: '',
        customstore_id: '',
        typeName: '',
        findDoctorSlider: [],
        allDeptInfo: [],
        doctorsByDept: [],
        nearestDoctors: [],
        popularDoctors: [],
        nearestConsultationCenterInfo: [],
        consultationCenterByDistrict: [],
        deptInfoByConsultationCenter: [],
        doctorsByConsultationCenterByDept: [],
        nearestDiagnosticCenter: [],
        diagnosticCenterInfoByDistrict: [],
        popularHospitalByDistrict: [],
        nearestHospitalInfo: [],
        topHospitalInCountry: [],
        hospitalInfoByDistrict: [],
        pageNoForPopular: 2,
    },
    reducers: {
        handleDoctorReducer: (state = initialState, { payload }) => {
            if (payload.type == 'CLEAR_ALL') {
                return {
                    ...state,
                    merchantId: '',
                    customstore_id: '',
                    typeName: '',
                    findDoctorSlider: [],
                    allDeptInfo: [],
                    doctorsByDept: [],
                    nearestDoctors: [],
                    popularDoctors: [],
                    nearestConsultationCenterInfo: [],
                    consultationCenterByDistrict: [],
                    deptInfoByConsultationCenter: [],
                    doctorsByConsultationCenterByDept: [],
                    nearestDiagnosticCenter: [],
                    diagnosticCenterInfoByDistrict: [],
                    popularHospitalByDistrict: [],
                    nearestHospitalInfo: [],
                    topHospitalInCountry: [],
                    hospitalInfoByDistrict: [],
                    currentCenter:{},
                    pageNoForPopular: 2,
                };
            }
            else if (payload.type == 'SAVE_DEPT_INFO') {
                state, findDoctorSlider = payload.data.sliders;
                state.allDeptInfo = payload.data.allDepartments;
                state.popularDoctors = payload.data.popularDoctors;
            }
            else if (payload.type == 'SAVE_DOCTOR_INFO_BY_DEPT') {
                let Info = [];
                if (payload?.data?.length > 0) {
                    Info = [...state.doctorsByDept, ...payload.data];
                }
                state.doctorsByDept = Info
            }
            else if (payload.type == 'SAVE_NEAREST_DOCTOR_INFO') {
                let Info = [];
                if (payload?.data?.length > 0) {
                    Info = [...state.nearestDoctors, ...payload.data];
                }
                state.nearestDoctors = Info
            }
            else if (payload.type == 'SAVE_NEAREST_CONSULTATION_CENTER_INFO') {
                let Info = [];
                if (payload?.data?.length > 0) {
                    Info = [...state.nearestConsultationCenterInfo, ...payload.data];
                }
                state.nearestConsultationCenterInfo = Info
            }
            else if (payload.type == 'SAVE_CONSULTATION_CENTER_BY_DISTRICT') {
                let Info = [];
                if (payload?.data?.length > 0) {
                    Info = [...state.doctorsByConsultationCenterByDept, ...payload.data];
                }
                state.doctorsByConsultationCenterByDept = Info
            }
            else if (payload.type == 'SAVE_DEPT_INFO_BY_CONSULTATION_CENTER') {
                state.deptInfoByConsultationCenter = payload.data;
            }
            else if (payload.type == 'SAVE_DOCTOR_INFO_BY_CONSULTATION_CENTER') {
                let Info = [];
                if (payload?.data?.length > 0) {
                    Info = [...state.doctorsByDept, ...payload.data];
                }
                state.doctorsByDept = Info
            }
            else if (payload.type == 'SAVE_NEAREST_DIAGNOSTIC_CENTER') {
                let Info = [];
                if (payload?.data?.length > 0) {
                    Info = [...state.nearestDiagnosticCenter, ...payload.data];
                }
                state.nearestDiagnosticCenter = Info
            }
            else if (payload.type == 'SAVE_DIAGNOSTIC_CENTER_BY_DISTRICT') {
                let Info = [];
                if (payload?.data?.length > 0) {
                    Info = [...state.diagnosticCenterInfoByDistrict, ...payload.data];
                }
                state.diagnosticCenterInfoByDistrict = Info
            }
            else if (payload.type == 'SAVE_NEAREST_HOSPITAL') {
                let Info = [];
                if (payload?.data?.length > 0) {
                    Info = [...state.nearestHospitalInfo, ...payload.data];
                }
                state.nearestHospitalInfo = Info
            }
            else if (payload.type == 'SAVE_TOP_HOSPITAL') {
                let Info = [];
                if (payload?.data?.length > 0) {
                    Info = [...state.topHospitalInCountry, ...payload.data];
                }
                state.topHospitalInCountry = Info
            }
            else if (payload.type == 'SAVE_HOSPITAL_BY_DISTRICT') {
                let Info = [];
                if (payload?.data?.length > 0) {
                    Info = [...state.hospitalInfoByDistrict, ...payload.data];
                }
                state.hospitalInfoByDistrict = Info
            }
            else if (payload.type == 'EXPLORE_FOOD_STORE_ITEMS') {
                let productByCategory = [];
                payload?.data?.allProductCategory?.forEach((info, i) => {
                    productByCategory.push({
                        _id: info?.categoryInfo?._id,
                        catagory: info?.categoryName,
                        itemsInfo: payload?.data?.allProduct?.filter(
                            (item) => item?.productCategory === info?.categoryInfo?._id
                        )
                    });
                });
                return {
                    ...state,
                    isLoading: false,
                    productCategory: payload?.data?.allProductCategory || [],
                    productInfoByShop: productByCategory || [],
                    popularItem: payload?.data?.allProduct?.filter(p => p.is_popular === true) || [],
                    merchantId: payload?.data?.storeId || '',
                    customstore_id: payload?.data?.customstoreId || '',
                };
            }
            else if (payload.type == 'FOOD_STORE_RESET') {
                return {
                    ...state,
                    productCategory: [],
                    productInfoByShop: [],
                    popularItem: [],
                };
            }
            else if (payload.type == 'SAVE_SUBTYPE_INFO_BY_TYPE') {
                return {
                    ...state,
                    typeName: payload?.data?.typeName,
                    subtypeByselectedType: payload?.data?.subtype || [],
                };
            }
            else if (payload.type == 'SAVE_POPULAR_PRODUCT_INFO') {
                state.popularItem = [...state.popularItem, ...payload.data];
                state.pageNoForPopular = parseFloat(state.pageNoForPopular) + 1
            }
            else if (payload.type == 'SAVE_CENTER_INFO') {
                state.currentCenter = payload.data;
            }
            else {
                return {
                    ...state,
                };
            }
        },
    },
});

export const { handleDoctorReducer } = doctorReducer.actions;

export default doctorReducer.reducer;
