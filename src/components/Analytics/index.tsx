import { makeStyles } from '@mui/styles';
import { useTheme } from 'emotion-theming';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Button, Flex, Text
} from 'rebass';
import { setCurrentStore, setStoreList } from '../../store/action/authAction';
import { pageLoader } from '../../store/action/snackbarAction';
import { RootState } from '../../store/reducer';
import '../../styles/analytics.css';
import { Theme } from '../../theme/px/types';
import ApiUtil from '../../util/ApiUtil';
import {
  Heading1, Heading2, Heading3, Heading4, Heading5
} from '../Headings';
import { SelectBox } from '../Shared/Select';
import FlexBox from '../utility/FlexBox';
import SalesByFitType from './SalesByFitType';
import StoreDialog from './StoreDialog';
import SwanROI from './SwanROI';
import UsersNonUsers from './UsersNonUsers';

const useStyles = makeStyles(() => ({
  salesConversionTitle: {
    fontFamily: 'AvenirLTPro-Heavy',
    fontWeight: 900,
    fontSize: '16px',
    lineHeight: '150%',
    color: '#0C0C0'
  },
  salesConversionText: {
    fontWeight: 900,
    fontSize: '14px',
    lineHeight: '150%',
    color: '#0C0C0C'
  }
}));

const filterTypeOptions = [
  { lbl: 'Last Month', val: 'Last month' },
  { lbl: 'Last Week', val: 'Last week' },
  { lbl: 'Last Quarter', val: 'Last quarter' }
];

export default function Analytics() {
  const theme = useTheme<Theme>();
  const classes = useStyles();
  // const isMobile = window.innerWidth < 576;
  type monthType = {
    monthlyTotalPrice: any;
    month: number;
    data: Array<object>;
    year: number;
    count: number;
  };
  type salesType = {
    valDiff: number;
    percentageDiff: number;
    currVal: number;
    count: number;
  };
  // const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const { storeList, currentStore, loginUser }: any = useSelector((state: RootState) => state.auth);

  // const [currentStore, setCurrentStore] = useState<any>({});
  const [openStoreDialog, setOpenStoreDialog] = useState(false);

  useEffect(() => {
    const activeStore = localStorage.getItem('userCredentials');

    if (activeStore) {
      console.log(activeStore);
      dispatch(setCurrentStore(JSON.parse(activeStore).store));
    } else if (!currentStore && storeList && storeList?.length > 0) {
      console.log('storeList', storeList);
      dispatch(setCurrentStore(storeList[0]));
    }
  }, [storeList]);
  // const [monthlyOrder, setMonthlyOrder] = useState<object[]>([]); // set data from API

  // const [salesMonthOrder, setSalesMonthOrder] = useState<salesType[]>([]);
  // const [lastmonthDiff, setLastmonthDiff] = useState<any>();
  const [salesFilterType, setSalesFilterType] = useState<string>('Last month');
  let monthArray = Array.from(Array(12).keys());

  const [labelOrder, setLabelOrder] = useState<number[]>([]);
  // const [lastSalesDiff, setLastSalesDiff] = useState<salesType>({
  //   valDiff: 0,
  //   percentageDiff: 0,
  //   currVal: 0
  // });
  const [lastSalesDiff, setLastSalesDiff] = useState<any>({});
  // const [salesOrder, setSalesOrder] = useState<salesType[]>([]);// pass data to line chart
  const [responseData, setResponseData] = useState<any>({});

  const [salesOrder, setSalesOrder] = useState<object>({}); // pass data to line chart
  const [returnOrders, setReturnOrders] = useState<object>({});
  const [fitViewClickOrders, setFitViewClickOrders] = useState<object>({});

  const [totAmountPlacOrder, setTotAmountPlacOrder] = useState<any>({
    swanOrders: 0,
    nonSwanOrders: 0
  });
  console.log(totAmountPlacOrder);
  const currencySymbols: any = {
    USD: '$', // US Dollar
    EUR: '€', // Euro
    CRC: '₡', // Costa Rican Colón
    GBP: '£', // British Pound Sterling
    ILS: '₪', // Israeli New Sheqel
    INR: '₹', // Indian Rupee
    JPY: '¥', // Japanese Yen
    KRW: '₩', // South Korean Won
    NGN: '₦', // Nigerian Naira
    PHP: '₱', // Philippine Peso
    PLN: 'zł', // Polish Zloty
    PYG: '₲', // Paraguayan Guarani
    THB: '฿', // Thai Baht
    UAH: '₴', // Ukrainian Hryvnia
    VND: '₫' // Vietnamese Dong
  };
  const [currencyType, setCurrencyType] = useState('');
  // monthly order - percentage difference start
  function getPercentageIncrease(numA: number, numB: number) {
    let result = ((numA - numB) / numB) * 100;
    if (result === Infinity) {
      result = 100;
    }
    return result;
  }
  const monthlyOrderDefinePercentage = (dataObj: any) => {
    // useEffect(() => {
    // // for percentage calculation and value difference
    let {
      // eslint-disable-next-line prefer-const
      monthlyOrder, key,
      setSalesOrderTemp,
      setTotAmountPlacOrderTemp,
      setLastSalesDiffTemp
    } = dataObj;
    monthArray = Array.from(Array(12).keys());
    const salesChartData: Array<salesType> = [];
    if (monthlyOrder.length > 0) {
      let totalPlacedOrderAmount = 0;
      // const currentDate = new Date();
      // const currentMonth = currentDate.getMonth() + 1;
      const monthOrder = monthlyOrder as monthType[];
      let percentageDiff = 0;
      const monthOrderIndex = [
        ...monthArray.splice(new Date().getMonth()),
        ...monthArray
      ];
      setLabelOrder(monthOrderIndex);
      for (let i = 0; i < 12; i += 1) {
        percentageDiff = 0;

        const currIndexData = monthOrder.filter(
          (x) => x.month === monthOrderIndex[i]
        )[0];
        const prevIndexData = monthOrder.filter(
          (x) => x.month === monthOrderIndex[i - 1]
        )[0];
        if (currIndexData) {
          totalPlacedOrderAmount += currIndexData?.monthlyTotalPrice || 0;
        }

        // if (currentMonth + 1 === i) {
        if (i === 0) {
          salesChartData.push({
            valDiff: currIndexData ? currIndexData?.monthlyTotalPrice : 0,
            percentageDiff: 0,
            currVal: currIndexData ? currIndexData?.monthlyTotalPrice : 0,
            count: currIndexData ? currIndexData?.count : 0
          });
        } else if (currIndexData) {
          if (prevIndexData) {
            percentageDiff = getPercentageIncrease(
              currIndexData.monthlyTotalPrice,
              prevIndexData.monthlyTotalPrice
            );
            const valDiff = currIndexData.monthlyTotalPrice - prevIndexData.monthlyTotalPrice;
            salesChartData.push({
              valDiff,
              percentageDiff,
              currVal: currIndexData ? currIndexData?.monthlyTotalPrice : 0,
              count: currIndexData ? currIndexData?.count : 0
            });
            // in future change into object diff{ diffvalue:value,percentage:data}
          } else {
            // previous month value is null, so the difference is current month value
            salesChartData.push({
              valDiff: currIndexData.monthlyTotalPrice,
              percentageDiff: 100,
              currVal: currIndexData ? currIndexData?.monthlyTotalPrice : 0,
              count: currIndexData ? currIndexData?.count : 0
            });
          }
        } else if (prevIndexData) {
          salesChartData.push({
            valDiff: -prevIndexData.monthlyTotalPrice,
            percentageDiff:
              getPercentageIncrease(
                0, // current value is null
                prevIndexData.monthlyTotalPrice
              ) || 0,
            currVal: 0,
            count: 0
          });
        } else {
          salesChartData.push({
            valDiff: 0, percentageDiff: 0, currVal: 0, count: 0
          });
        }
      }
      //
      // setSalesMonthOrder(salesChartData);
      // setSalesOrder(salesChartData);
      // console.log(salesChartData);
      // compare with last completed month with previous month so we minous 2
      // const lastMonthDiffIndex = currentDate.getMonth() === 0 ? 12 : currentDate.getMonth() - 1;
      // setLastSalesDiff(salesChartData[salesChartData.length - 1]);
      // setTotAmountPlacOrder(totalPlacedOrderAmount);
      setSalesOrderTemp = {
        ...{ [key]: salesChartData },
        ...setSalesOrderTemp
      };
      setLastSalesDiffTemp = {
        ...{ [key]: salesChartData[salesChartData.length - 1] },
        ...setLastSalesDiffTemp
      };

      // salesChartData[currentMonth - 1]);
      setTotAmountPlacOrderTemp = {
        ...{ [key]: totalPlacedOrderAmount },
        ...setTotAmountPlacOrderTemp
      };
    } return { setSalesOrderTemp, setLastSalesDiffTemp, setTotAmountPlacOrderTemp };
  };
  // }, [monthlyOrder]);
  // ******* monthly order - percentage difference End********
  const setMonthlyData = (
    MonthlyDataPram: any = {},
    isReturnOrders: boolean = false,
    isFitViewData: boolean = false
  ) => {
    let setSalesOrderTemp: any = {}; let setTotAmountPlacOrderTemp: any = {};

    let setLastSalesDiffTemp: any = {};
    let MonthlyData: any = {};
    if (isFitViewData) {
      MonthlyData.fitViewClicked = MonthlyDataPram.fitViewClicked;
    } else {
      MonthlyData = MonthlyDataPram;
    }
    Object.keys(MonthlyData).forEach((key) => {
      const result: object[] = [];
      const containsArr: string[] = [];
      let currencyTypeTemp = '';
      for (let i = 0; i < MonthlyData[key].length; i += 1) {
        const first = new Date(MonthlyData[key][i]?.created_at);
        const tempArr = [];
        let monthlyTotalPrice = 0;
        if (!containsArr.includes(MonthlyData[key][i]?.created_at)) {
          for (let j = i + 1; j < MonthlyData[key].length; j += 1) {
            const second = new Date(MonthlyData[key][j]?.created_at);
            if (
              first.getFullYear() === second.getFullYear()
              && first.getMonth() === second.getMonth()
            ) {
              tempArr.push(MonthlyData[key][j]);
              containsArr.push(MonthlyData[key][j].created_at);
              monthlyTotalPrice += parseFloat(MonthlyData[key][j].total_price);
            }
          }

          if (currencyTypeTemp === '') {
            currencyTypeTemp = currencySymbols[MonthlyData[key][i].currency]
              || MonthlyData[key][i].currency;
          }
          tempArr.push(MonthlyData[key][i]);
          monthlyTotalPrice += parseFloat(MonthlyData[key][i].total_price || 0);
          const month = first.getMonth();

          result.push({
            data: tempArr,
            monthlyTotalPrice,
            month,
            year: first.getFullYear(),
            count: tempArr.length
          });
        }
      }
      // result.sort((obj1:any, obj2:any) => {
      //   if (obj1.month > obj2.month) {
      //     return 1;
      //   }

      //   if (obj1.month < obj2.month) {
      //     return -1;
      //   }

      //   return 0;
      // });
      if (currencyTypeTemp && currencyTypeTemp !== '') {
        console.log('308', currencyTypeTemp);
        setCurrencyType(currencyTypeTemp);
      }

      // console.log(result);
      // monthlyOrderDefinePercentage(result);
      const returnData: any = monthlyOrderDefinePercentage({
        monthlyOrder: result,
        key,
        setSalesOrderTemp,
        setTotAmountPlacOrderTemp,
        setLastSalesDiffTemp
      });
      console.log(returnData);

      if (returnData) {
        setSalesOrderTemp = returnData.setSalesOrderTemp;
        setLastSalesDiffTemp = returnData.setLastSalesDiffTemp;
        setTotAmountPlacOrderTemp = returnData.setTotAmountPlacOrderTemp;
      }
    });

    if (!isReturnOrders && !isFitViewData) {
      setSalesOrder(setSalesOrderTemp);
      setTotAmountPlacOrder(setTotAmountPlacOrderTemp);
      setLastSalesDiff(setLastSalesDiffTemp);
    } else if (isReturnOrders) {
      setReturnOrders(setSalesOrderTemp);
    } else if (isFitViewData) {
      setFitViewClickOrders(setSalesOrderTemp?.fitViewClicked || []);
    }
    // setMonthlyOrder(result);
  };

  // weekly order - percentage difference start (make convinient chart)
  const weeklyOrderDefinePercentage = (dataObj: any) => {
    //
    const data = dataObj.result;
    const weekArray = Array.from(Array(7).keys());
    let {
      // eslint-disable-next-line prefer-const
      previousWeekTotalPrice, key,
      setSalesOrderTemp,
      setTotAmountPlacOrderTemp,
      setLastSalesDiffTemp
    } = dataObj;
    // // for percentage calculation and value difference
    type weeklyType = {
      totalPrice: any;
      month: number;
      date: number;
      day: number;
      data: Array<object>;
      year: number;
      count: number;
    };
    const salesChartData: Array<salesType> = [];
    // if (data.length > 0) {
    let totalPlacedOrderAmount = 0;
    // const currentDate = new Date();
    // const currentDay = currentDate.getDay();
    const weekOrder = data as weeklyType[];
    let percentageDiff = 0;

    const weekOrderIndex = [
      ...weekArray.splice(new Date().getDay()),
      ...weekArray
    ];
    setLabelOrder(weekOrderIndex);
    for (let i = 0; i < 7; i += 1) {
      percentageDiff = 0;
      const currIndexData = weekOrder.filter(
        (x) => x.day === weekOrderIndex[i]
      )[0];
      const prevIndexData = weekOrder.filter(
        (x) => x.day === weekOrderIndex[i - 1]
      )[0];
      if (currIndexData) {
        totalPlacedOrderAmount += currIndexData?.totalPrice || 0;
      }

      if (i === 0) {
        // [1  ,2  ,(3)  ,4  ,5  ,6, 7] if 3 is a current day means day 4 persentage begins with 0
        salesChartData.push({
          valDiff: currIndexData ? currIndexData?.totalPrice : 0,
          percentageDiff: 0,
          currVal: currIndexData ? currIndexData?.totalPrice : 0,
          count: currIndexData ? currIndexData?.count : 0
        });
      } else if (currIndexData) {
        if (prevIndexData) {
          percentageDiff = getPercentageIncrease(
            currIndexData.totalPrice,
            prevIndexData.totalPrice
          );
          const valDiff = currIndexData.totalPrice - prevIndexData.totalPrice;
          salesChartData.push({
            valDiff,
            percentageDiff,
            currVal: currIndexData ? currIndexData?.totalPrice : 0,
            count: currIndexData ? currIndexData?.count : 0
          });
          // in future change into object diff{ diffvalue:value,percentage:data}
        } else {
          // previous month value is null, so the difference is current month value
          salesChartData.push({
            valDiff: currIndexData.totalPrice,
            percentageDiff: 100,
            currVal: currIndexData ? currIndexData?.totalPrice : 0,
            count: currIndexData ? currIndexData?.count : 0
          });
        }
      } else if (prevIndexData) {
        salesChartData.push({
          valDiff: -prevIndexData.totalPrice,
          percentageDiff:
            getPercentageIncrease(
              0, // current value is null
              prevIndexData.totalPrice
            ) || 0,
          currVal: 0,
          count: 0
        });
      } else {
        salesChartData.push({
          valDiff: 0, percentageDiff: 0, currVal: 0, count: 0
        });
      }
    }
    //
    // setSalesOrder(salesChartData);
    // console.log(salesChartData);
    const salesDiff = {
      valDiff: totalPlacedOrderAmount - previousWeekTotalPrice,
      percentageDiff:
        getPercentageIncrease(
          totalPlacedOrderAmount, // current value is null
          previousWeekTotalPrice
        ) || 0,
      currVal: totalPlacedOrderAmount
    };
    // setLastSalesDiff(salesDiff); // salesChartData[currentDay - 1]);
    // setTotAmountPlacOrder(totalPlacedOrderAmount);
    setSalesOrderTemp = {
      ...{ [key]: salesChartData },
      ...setSalesOrderTemp
    };
    setLastSalesDiffTemp = {
      ...{ [key]: salesDiff },
      ...setLastSalesDiffTemp
    };

    // salesChartData[currentMonth - 1]);
    setTotAmountPlacOrderTemp = {
      ...{ [key]: totalPlacedOrderAmount },
      ...setTotAmountPlacOrderTemp
    };
    return { setSalesOrderTemp, setLastSalesDiffTemp, setTotAmountPlacOrderTemp };
    // }
  };
  // ******* weekly order - percentage difference End********
  //* * weekly order array structure */
  const setWeeklyOrderData = (
    weeklyDataPram: any,
    isReturnOrders: boolean = false,
    isFitViewData: boolean = false
  ) => {
    let setSalesOrderTemp: any = {}; let setTotAmountPlacOrderTemp: any = {};

    let setLastSalesDiffTemp: any = {};

    let weeklyOrders: any = {};
    if (isFitViewData) {
      weeklyOrders.fitViewClicked = weeklyDataPram.fitViewClicked;
    } else if (isReturnOrders) {
      weeklyOrders = weeklyDataPram.returnOrders;
    } else {
      weeklyOrders = weeklyDataPram.orders;
    }
    Object.keys(weeklyOrders).forEach((key) => {
      const data = weeklyOrders[key];
      // const data = weeklyData.orders;
      const result: object[] = [];
      const containsArr: string[] = [];
      //
      let currencyTypeTemp = '';
      for (let i = 0; i < data.length; i += 1) {
        const first = new Date(data[i]?.created_at);
        const tempArr = [];
        let totalPrice = 0;

        if (!containsArr.includes(data[i]?.created_at)) {
          for (let j = i + 1; j < data.length; j += 1) {
            const second = new Date(data[j]?.created_at);
            if (
              first.getFullYear() === second.getFullYear()
              && first.getMonth() === second.getMonth()
              && first.getDate() === second.getDate()
            ) {
              tempArr.push(data[j]);
              containsArr.push(data[j].created_at);
              totalPrice += parseFloat(data[j].total_price);
            }
          }

          if (currencyTypeTemp === '') {
            currencyTypeTemp = currencySymbols[data[i].currency] || data[i].currency;
          }
          tempArr.push(data[i]);
          totalPrice += parseFloat(data[i].total_price);
          const month = first.getMonth();
          const date = first.getDate();
          const day = first.getDay();
          result.push({
            data: tempArr,
            totalPrice,
            month,
            date,
            day,
            year: first.getFullYear(),
            count: tempArr.length
          });
        }
      }
      if (currencyTypeTemp !== '' && currencyTypeTemp) {
        console.log('533', currencyTypeTemp);
        setCurrencyType(currencyTypeTemp);
      }

      let previousWeekTotalPrice = 0;
      if (weeklyDataPram?.previousWeek[key]) {
        weeklyDataPram.previousWeek[key].forEach((x: any) => {
          previousWeekTotalPrice += parseFloat(x.total_price);
        });
      }

      //
      // weeklyOrderDefinePercentage({ result, previousWeekTotalPrice });
      const returnData: any = weeklyOrderDefinePercentage({
        result,
        previousWeekTotalPrice,

        key,
        setSalesOrderTemp,
        setTotAmountPlacOrderTemp,
        setLastSalesDiffTemp
      });
      console.log(returnData);

      if (returnData) {
        setSalesOrderTemp = returnData.setSalesOrderTemp;
        setLastSalesDiffTemp = returnData.setLastSalesDiffTemp;
        setTotAmountPlacOrderTemp = returnData.setTotAmountPlacOrderTemp;
      }
    });

    if (!isReturnOrders && !isFitViewData) {
      setSalesOrder(setSalesOrderTemp);
      setTotAmountPlacOrder(setTotAmountPlacOrderTemp);
      setLastSalesDiff(setLastSalesDiffTemp);
    } else if (isReturnOrders) {
      setReturnOrders(setSalesOrderTemp);
    } else if (isFitViewData) {
      setFitViewClickOrders(setSalesOrderTemp?.fitViewClicked || []);
    }
  };

  // quarter order - percentage difference start (make convinient chart)
  const quarterOrderDefinePercentage = (dataObj: any) => {
    const data = dataObj.result;

    let {
      // eslint-disable-next-line prefer-const
      previousQuarterTotalPrice, months, key,
      setSalesOrderTemp,
      setTotAmountPlacOrderTemp,
      setLastSalesDiffTemp
    } = dataObj;
    // key is order type that is swan orders or non swan orders
    // // for percentage calculation and value difference
    type quarterType = {
      totalPrice: any;
      month: number;
      date: number;
      day: number;
      data: Array<object>;
      year: number;
      count: number;
    };
    const salesChartData: Array<salesType> = [];
    setLabelOrder(months);
    if (data.length > 0) {
      let totalPlacedOrderAmount = 0;
      // const currentDate = new Date();
      // const currentMonth = currentDate.getMonth();
      const quarterOrder = data as quarterType[];
      let percentageDiff = 0;

      for (let i = 0; i < 3; i += 1) {
        percentageDiff = 0;
        const currIndexData = quarterOrder.filter(
          (x) => x.month === months[i]
        )[0];
        const prevIndexData = quarterOrder.filter(
          (x) => x.month === months[i - 1]
        )[0];
        if (currIndexData) {
          totalPlacedOrderAmount += currIndexData?.totalPrice || 0;
        }

        if (i === 0) {
          salesChartData.push({
            valDiff: currIndexData ? currIndexData?.totalPrice : 0,
            percentageDiff: 0,
            currVal: currIndexData ? currIndexData?.totalPrice : 0,
            count: currIndexData ? currIndexData?.count : 0
          });
        } else if (currIndexData) {
          if (prevIndexData) {
            percentageDiff = getPercentageIncrease(
              currIndexData.totalPrice,
              prevIndexData.totalPrice
            );
            const valDiff = currIndexData.totalPrice - prevIndexData.totalPrice;
            salesChartData.push({
              valDiff,
              percentageDiff,
              currVal: currIndexData ? currIndexData?.totalPrice : 0,
              count: currIndexData ? currIndexData?.count : 0
            });
            // in future change into object diff{ diffvalue:value,percentage:data}
          } else {
            // previous month value is null, so the difference is current month value
            salesChartData.push({
              valDiff: currIndexData.totalPrice,
              percentageDiff: 100,
              currVal: currIndexData ? currIndexData?.totalPrice : 0,
              count: currIndexData ? currIndexData?.count : 0
            });
          }
        } else if (prevIndexData) {
          salesChartData.push({
            valDiff: -prevIndexData.totalPrice,
            percentageDiff:
              getPercentageIncrease(
                0, // current value is null
                prevIndexData.totalPrice
              ) || 0,
            currVal: 0,
            count: 0
          });
        } else {
          salesChartData.push({
            valDiff: 0, percentageDiff: 0, currVal: 0, count: 0
          });
        }
      }
      //

      setSalesOrderTemp = {
        ...{ [key]: salesChartData },
        ...setSalesOrderTemp
      };

      const salesDiff = {
        valDiff: totalPlacedOrderAmount - previousQuarterTotalPrice,
        percentageDiff:
          getPercentageIncrease(
            totalPlacedOrderAmount, // current value is null
            previousQuarterTotalPrice
          ) || 0,
        currVal: totalPlacedOrderAmount
      };
      setLastSalesDiffTemp = {
        ...{ [key]: salesDiff },
        ...setLastSalesDiffTemp
      };

      // salesChartData[currentMonth - 1]);
      setTotAmountPlacOrderTemp = {
        ...{ [key]: totalPlacedOrderAmount },
        ...setTotAmountPlacOrderTemp
      };
    }
    return { setSalesOrderTemp, setLastSalesDiffTemp, setTotAmountPlacOrderTemp };
  };
  const resetChartData = () => {
    setSalesOrder({});
    setTotAmountPlacOrder({});
    setLastSalesDiff({});
    setReturnOrders({});
  };
  // ******* quarter order - percentage difference End********
  //* * quarter order array structure */
  const setquarterOrderData = (
    quarterDataPram: any,
    isReturnOrders: boolean = false,
    isFitViewData: boolean = false
  ) => {
    let setSalesOrderTemp: any = {}; let setTotAmountPlacOrderTemp: any = {};
    let months: number[] = [];

    let setLastSalesDiffTemp: any = {};
    // let quarterDataOrders = isReturnOrders ? quarterData.returnOrders : quarterData.orders;
    let quarterDataOrders: any = {};
    if (isFitViewData) {
      quarterDataOrders.fitViewClicked = quarterDataPram.fitViewClicked;
    } else if (isReturnOrders) {
      quarterDataOrders = quarterDataPram.returnOrders;
    } else {
      quarterDataOrders = quarterDataPram.orders;
    }
    Object.keys(quarterDataOrders).forEach((key) => {
      const data = quarterDataOrders[key];

      // const data = quarterData.orders;

      const result: object[] = [];
      const containsArr: string[] = [];

      let currencyTypeTemp = '';
      for (let i = 0; i < data.length; i += 1) {
        const first = new Date(data[i]?.created_at);
        const tempArr = [];
        let totalPrice = 0;

        if (!containsArr.includes(data[i]?.created_at)) {
          for (let j = i + 1; j < data.length; j += 1) {
            const second = new Date(data[j]?.created_at);
            if (
              first.getFullYear() === second.getFullYear()
              && first.getMonth() === second.getMonth()
            ) {
              tempArr.push(data[j]);
              containsArr.push(data[j].created_at);
              totalPrice += parseFloat(data[j].total_price);
            }
          }

          if (currencyTypeTemp === '') {
            currencyTypeTemp = currencySymbols[data[i].currency] || data[i].currency;
          }
          tempArr.push(data[i]);
          totalPrice += parseFloat(data[i].total_price);
          const month = first.getMonth();
          const date = first.getDate();
          const day = first.getDay();
          result.push({
            data: tempArr,
            totalPrice,
            month,
            date,
            day,
            year: first.getFullYear(),
            count: tempArr.length
          });
        }
      }
      if (currencyTypeTemp !== '' && currencyTypeTemp) {
        console.log('767', currencyTypeTemp);
        setCurrencyType(currencyTypeTemp);
      }

      let previousQuarterTotalPrice = 0;
      if (quarterDataPram?.previousQuarter[key]) {
        quarterDataPram.previousQuarter[key].forEach((x: any) => {
          previousQuarterTotalPrice += parseFloat(x.total_price);
        });
      }
      //

      let currentMonth = new Date().getMonth();
      currentMonth -= 3;
      monthArray = Array.from(Array(12).keys());
      if (months.length === 0) {
        if (currentMonth >= 0) {
          months = monthArray.splice(currentMonth, 3);
        } else {
          currentMonth = 12 + currentMonth;
          const temp = monthArray.splice(currentMonth, 3);
          if (temp.length !== 3) {
            const remainCount = 3 - temp.length; // find the remaining month in quarter
            months = [...temp, ...monthArray.splice(0, remainCount)];
          }
        }
      }
      //
      const returnData: any = quarterOrderDefinePercentage({
        result,
        previousQuarterTotalPrice,
        months,
        key,
        setSalesOrderTemp,
        setTotAmountPlacOrderTemp,
        setLastSalesDiffTemp
      });
      console.log(returnData);

      if (returnData) {
        setSalesOrderTemp = returnData.setSalesOrderTemp;
        setLastSalesDiffTemp = returnData.setLastSalesDiffTemp;
        setTotAmountPlacOrderTemp = returnData.setTotAmountPlacOrderTemp;
      }
    });

    if (!isReturnOrders && !isFitViewData) {
      setSalesOrder(setSalesOrderTemp);
      setTotAmountPlacOrder(setTotAmountPlacOrderTemp);
      setLastSalesDiff(setLastSalesDiffTemp);
    } else if (isReturnOrders) {
      setReturnOrders(setSalesOrderTemp);
    } else if (isFitViewData) {
      setFitViewClickOrders(setSalesOrderTemp?.fitViewClicked || []);
    }
  };
  function changeOrdersType(event: any, switchedStore: any) {
    const type = event || salesFilterType;

    console.log(event, salesFilterType, type);
    dispatch(pageLoader(true));

    ApiUtil.postWithToken('analytics/getanalysticFilter?type=Last month', { currentStore: switchedStore || currentStore }).then(
      (res: any) => {
        setSalesFilterType(type);
        resetChartData();
        if (res.data?.stores && (JSON.stringify(res.data?.stores) !== JSON.stringify(storeList))) {
          dispatch(setStoreList(res.data.stores));
        }
        setResponseData(res.data);
        switch (type) {
          case 'Last month':
            setMonthlyData(res.data.orders);
            setMonthlyData(res.data.returnOrders, true);
            setMonthlyData(res.data, false, true);

            break;
          case 'Last week':
            setWeeklyOrderData(res.data);
            setWeeklyOrderData(res.data, true);
            setWeeklyOrderData(res.data, false, true);

            break;
          case 'Last quarter':
            setquarterOrderData(res.data);
            setquarterOrderData(res.data, true);
            setquarterOrderData(res.data, false, true);
            break;
          default:
            res.status(500).send({ message: 'invalid type' });
        }
        dispatch(pageLoader(false));
      }
    ).catch((err) => {
      dispatch(pageLoader(false));
      console.log(err);
    });
  }

  // function getPercentageIncrease(numA, numB) {
  //   return ((numA - numB) / numB) * 100;
  // }
  // getPercentageIncrease(110,100)//pram1 currentMonth parem2 previous month

  useEffect(() => {
    console.log('useEffect analytics', currentStore);
    dispatch(pageLoader(true));

    ApiUtil.postWithToken('analytics/getPlacedOrders', currentStore).then((res: any) => {
      setMonthlyData(res.data.orders);

      setMonthlyData(res.data.returnOrders, true);
      setMonthlyData(res.data, false, true);
      setResponseData(res.data);

      console.log(currentStore);
      if (res.data?.stores && (JSON.stringify(res.data?.stores) !== JSON.stringify(storeList))) {
        if (res.data.stores.length === 1 || !(currentStore || loginUser)) {
          localStorage.setItem('userCredentials', JSON.stringify({ store: res.data.stores[0], user: res.data.user }));
          console.log(localStorage.getItem('userCredentials'));
          dispatch(setCurrentStore(res.data.stores[0]));
        }
        console.log(res.data.stores);
        dispatch(setStoreList(res.data.stores));
      }
      dispatch(pageLoader(false));
      // console.log(res);
    }).catch((err) => {
      dispatch(pageLoader(false));
      console.log(err);
    });
  }, []);

  const handleClickOpen = () => {
    setOpenStoreDialog(true);
  };
  const handleSelectStore = (current: any) => {
    setOpenStoreDialog(false);
    dispatch(setCurrentStore(current));
    localStorage.setItem('userCredentials', JSON.stringify({ store: current, user: loginUser }));
    changeOrdersType(null, current);
  };

  const handleClose = () => {
    setOpenStoreDialog(false);
    // setFiles([]);
    // setLoaderPercent(0);
  };
  return (
    <Box
      px={[theme.marginSpacing.xl, '80px']}
      width="100vw"
    >

      {openStoreDialog && (
        <StoreDialog
          storeList={storeList}
          handleClose={handleClose}
          openStoreDialog={openStoreDialog}
          handleSelectStore={handleSelectStore}
        />
      )}
      {/* Header part */}
      <FlexBox
        justifyContent="space-between"
        className="header"
        flexWrap="wrap"
        flexDirection={['column-reverse', 'row']}
        mt={[theme.marginSpacing.xxxl, '70px']}
        mb={['auto', theme.marginSpacing.xl]}
        textAlign="left"
      >
        <Heading1
          ml={['2%', 'unset']}
          sx={{
            fontFamily: theme.fonts.heading
          }}
          fontSize={['24px', '32px']}
        >
          Analytics
        </Heading1>

        {/* <FlexBox
          variant={"grayButton"}
          sx={{
            width: "151px",
            height: "40px",
            border: "0.5px solid #D1D1D1",
            boxSizing: "border-box",
            borderRadius: "8px",
            fontFamily: theme.fonts.button,
            fontSize: "16px",
          }}
        >
          <Text>Last month</Text> <Box width={"25px"}> <ChevronDownIcon/></Box>
        </FlexBox> */}
        <FlexBox flexWrap="wrap" justifyContent="flex-end">
          {storeList && storeList.length > 1
            && (
              <Button
                mr={[0, '14px']}
                mb={['10px', 0]}
                sx={{
                  width: '158.79px',
                  height: '39px',
                  background: '#5932F3',
                  border: '1px solid rgba(197, 197, 197, 0.1)',
                  boxSizing: 'border-box',
                  boxShadow: '0px 2px 4px rgba(155, 155, 155, 0.25)',
                  borderRadius: '6px',
                  fontFamily: theme.fonts.button,
                  cursor: 'pointer'
                }}
                onClick={() => handleClickOpen()}
              >
                <Text sx={{ fontSize: '13px' }}>Switch the store</Text>
              </Button>
            )}

          {/* <Box className="analytics_filter"> */}
          {/* <Select
              sx={{ fontFamily: theme.fonts.button }}
              id="filterType"
              name="filterType"
              defaultValue="Last month"
              onChange={(e) => changeOrdersType(e, {})}
            >
              <option>Last month</option>
              <option>Last week</option>
              <option>Last quarter</option>
            </Select> */}
          <Box mb={['10px', 0]}>
            <SelectBox
              options={filterTypeOptions}
              activeOption="Last month"
              setOption={(e) => changeOrdersType(e, null)}
            />
          </Box>
          {/* </Box> */}

        </FlexBox>

      </FlexBox>
      <FlexBox alignItems="center" mb="5px" mt={[theme.marginSpacing.s, 0]}>
        <Heading4
          sx={{
            textAlign: 'left',
            fontFamily: theme.fonts.button
          }}
        >
          Store name:
        </Heading4>
        <Text ml="4px">{currentStore?.store_name || '-'}</Text>

      </FlexBox>
      {/* Body part */}
      <FlexBox
        vertical
      >
        <Box
          sx={{
            // '@media only screen and (min-width: 576px)': {
            //   background:
            //     'linear-gradient(94.59deg, #F8F8F8 -14.98%, rgba(255, 255, 255, 0) 107.38%)',
            //   border: '1px solid #F4F4F4',
            //   filter: 'drop-shadow(0px 2px 5px rgba(82, 82, 82, 0.05))'
            // }
          }}
        >
          <Heading3
            // ml={['6%', '2%']}
            mt={[theme.marginSpacing.xl, theme.marginSpacing.m]}
            fontSize={['20px', '24px']}
            sx={{
              textAlign: 'left',
              fontFamily: 'AvenirLTPro-Heavy',
              fontWeight: 900,
              fontSize: '24px',
              lineHeight: '150%',
              color: '#000000'
            }}
          >
            Summary
          </Heading3>
          <FlexBox
            mt={theme.marginSpacing.m}
            height={['auto', 'auto']}
            // justifyContent="space-evenly"
            flexDirection={['row', 'row']}
            flexWrap="wrap"
            sx={{
              // '@media only screen and (min-width: 576px)': {
              //   borderBottom: '1px solid rgba(0, 0, 0, 0.15)',
              //   background:
              //     'linear-gradient(180deg, rgba(89, 50, 243, 0.05) 0%,
              // rgba(196, 196, 196, 0) 100%)',
              //   minWidth: '500px'
              // },
              // '@media only screen and (max-width: 576px)': {
              //   background:
              //     'linear-gradient(94.59deg, #F8F8F8 -14.98%, rgba(255, 255, 255, 0) 107.38%)',
              //   border: '1px solid #F4F4F4',
              //   filter: 'drop-shadow(0px 2px 5px rgba(82, 82, 82, 0.05))',
              //   borderRadius: '6px'
              // }
            }}
          >
            <Box
              // padding={[0, '2%']}
              px={theme.marginSpacing.m}
              width={['100%', '47%', '47%', '23.5%']}
              mr={[0, theme.marginSpacing.s, theme.marginSpacing.s, '2%']}
              mb={[theme.marginSpacing.s, theme.marginSpacing.s, theme.marginSpacing.s, 0]}
              className="summaryBox"
            >
              <Heading2
                // mt={"26px"}
                fontSize={['24px', '26px']}
                mt={theme.marginSpacing.m}
                sx={{
                  fontFamily: 'AvenirLTPro-Heavy',
                  fontWeight: 900,
                  fontSize: '24px',
                  color: theme.colors.primary
                }}
              >
                {currencyType}
                {/* 82,345 */}
                {totAmountPlacOrder?.swanOrders?.toLocaleString() || 0}
              </Heading2>
              {' '}
              <Text
                my={theme.marginSpacing.xl}
                sx={{
                  fontFamily: 'AvenirLTPro-Book',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '150%',
                  color: '#0C0C0C'
                }}
              >
                Value of orders placed from
                <Text
                  as="span"
                  ml="5px"
                  sx={{
                    fontSize: '16px', fontWeight: 'bold', lineHeight: '1.5', color: theme.colors.primary
                  }}
                >
                  Swan users
                </Text>
              </Text>
            </Box>
            <Box
              // padding={[0, '2%']}
              width={['100%', '47%', '47%', '23.5%']}
              mb={[theme.marginSpacing.s, theme.marginSpacing.s, theme.marginSpacing.s, 0]}
              mr={[0, 0, 0, '2%']}
              className="summaryBox"
              px={theme.marginSpacing.m}
            >
              <FlexBox alignItems="center" mt={theme.marginSpacing.m} flexWrap="wrap">
                <Heading2
                  // mt={"26px"}
                  // width={['70%', '50%']}
                  fontSize={['24px', '26px']}
                  sx={{
                    fontFamily: 'AvenirLTPro-Heavy',
                    fontWeight: 900,
                    fontSize: '24px',
                    color: theme.colors.primary,
                    display: 'flex',
                    justifyContent: 'flex-start'
                    // width: '50%'
                  }}
                >
                  {currencyType}
                  {lastSalesDiff?.nonSwanOrders?.valDiff.toLocaleString() || 0}
                  {/* 3,435 */}
                </Heading2>
                <Text
                  ml="15px"
                  // fontFamily={theme.fonts.medium}
                  // width={['30%', '50%']}
                  fontSize="18px"
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start'
                    // width: '50%'
                  }}
                >
                  {/* (2.4%) */}
                  (
                  {lastSalesDiff?.nonSwanOrders?.percentageDiff.toFixed(2) || 0}
                  %)
                </Text>
              </FlexBox>
              <Text
                my={theme.marginSpacing.xl}
                sx={{
                  fontFamily: 'AvenirLTPro-Book',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '150%',
                  color: '#0C0C0C'
                }}
              >
                {' '}
                {lastSalesDiff?.nonSwanOrders?.valDiff > 0
                  ? `Increase since ${salesFilterType.toLowerCase()}`
                  : `Decrease since ${salesFilterType.toLowerCase()}`}
              </Text>
            </Box>
            <Box
              // padding={[0, '2%']}
              width={['100%', '47%', '47%', '23.5%']}
              mr={[0, theme.marginSpacing.s, theme.marginSpacing.s, '2%']}
              mb={[theme.marginSpacing.s, 0, 0]}
              className="summaryBox"
              px={theme.marginSpacing.m}
            >
              <Heading2
                fontSize={['24px', '26px']}
                mt={theme.marginSpacing.m}
                sx={{
                  fontFamily: 'AvenirLTPro-Heavy',
                  fontWeight: 900,
                  fontSize: '24px',
                  color: theme.colors.primary
                }}
              >
                {/* 30% */}
                {lastSalesDiff?.swanOrders?.percentageDiff.toFixed(2) || 0}
                %
              </Heading2>
              <Text
                my={theme.marginSpacing.xl}
                sx={{
                  fontFamily: 'AvenirLTPro-Book',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '150%',
                  color: '#0C0C0C'
                }}
              >
                Swan’s contribution to sales
              </Text>
            </Box>
            <Box
              // padding={[0, '2%']}
              width={['100%', '47%', '47%', '23.5%']}
              px={theme.marginSpacing.m}
              className="summaryBox"
            // sx={{}}
            >
              <FlexBox alignItems="center" mt={theme.marginSpacing.m} flexWrap="wrap">
                <Heading2
                  fontSize={['24px', '26px']}
                  // width={['70%', '50%']}
                  sx={{
                    fontFamily: 'AvenirLTPro-Heavy',
                    fontWeight: 900,
                    fontSize: '24px',
                    color: theme.colors.primary,
                    display: 'flex',
                    justifyContent: 'flex-start'
                    // width: '50%'
                  }}
                >
                  {/* 1200 */}
                  {currencyType}
                  {lastSalesDiff?.swanOrders?.valDiff.toLocaleString() || 0}
                </Heading2>
                <Text
                  ml="15px"
                  // fontFamily={theme.fonts.medium}
                  // width={['30%', '50%']}
                  fontSize="18px"
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start'
                    // width: '50%'
                  }}
                >
                  {/* (3.4%) */}
                  (
                  {lastSalesDiff?.swanOrders?.percentageDiff.toFixed(2) || 0}
                  %)
                </Text>
              </FlexBox>
              <Text
                my={theme.marginSpacing.xl}
                sx={{
                  fontFamily: 'AvenirLTPro-Book',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '150%',
                  color: '#0C0C0C'
                }}
              >
                Increase in fit view sessions
              </Text>
            </Box>
          </FlexBox>

          {/* <Text
            ml={['14px', '2%']}
            mt={[theme.marginSpacing.xl, theme.marginSpacing.m]}
            sx={{ textAlign: 'left' }}
          >
            Want to talk with us about your numbers?
          </Text>
          <Button
            ml={['14px', '34px']}
            mb={[theme.marginSpacing.xl, theme.marginSpacing.m]}
            mt={[theme.marginSpacing.s, theme.marginSpacing.s]}
            sx={{
              width: '158.79px',
              height: '39px',
              background: '#5932F3',
              border: '1px solid rgba(197, 197, 197, 0.1)',
              boxSizing: 'border-box',
              boxShadow: '0px 2px 4px rgba(155, 155, 155, 0.25)',
              borderRadius: '6px',
              fontFamily: theme.fonts.button,
              cursor: 'pointer'
            }}
            onClick={() => window.open('https://calendly.com/eoinswan')}
          >
            <Text sx={{ fontSize: '13px' }}>Book a call with us</Text>
          </Button> */}
        </Box>
        <Box className="content" paddingBottom={theme.marginSpacing.xxxl}>
          <FlexBox flexWrap="wrap">
            <Box
              width="100%"
              paddingRight={['unset', 0, 0, theme.marginSpacing.s]}
              mt={theme.marginSpacing.s}
              // ml={theme.marginSpacing.l}
              pb={['14px', '35px']}
              sx={{
                background: '#FFFFFF',
                border: '1px solid #F4F4F4',
                boxShadow: '0px 2px 5px rgba(82, 82, 82, 0.05)',
                display: 'flex',
                borderRadius: '8px'
              }}
              flexDirection="column"
            >
              <Heading3
                pl="30px"
                mt={[theme.marginSpacing.m, theme.marginSpacing.m]}
                sx={{ fontSize: '20px', fontWeight: theme.fontWeights.black }}
                fontFamily={theme.fonts.button}
              >
                Sales conversion
              </Heading3>
              <FlexBox flexDirection={['column', 'column', 'column', 'row']}>
                <Box width={['100%', '100%', '100%', 1 / 3]}>
                  <FlexBox vertical pl="30px">
                    <FlexBox
                      vertical
                      px="15px"
                      width="90%"
                      mb={theme.marginSpacing.s}
                      mt={[theme.marginSpacing.m, theme.marginSpacing.xl]}
                      sx={{ border: '1px solid #EFEFEF', borderRadius: '6px' }}
                    >
                      <Heading3
                        my={theme.marginSpacing.s}
                        className={classes.salesConversionTitle}
                      >
                        Orders
                      </Heading3>
                      <Flex mb={theme.marginSpacing.s} alignItems="center" flexWrap="wrap">
                        <Heading5 mr="4px" className={classes.salesConversionText} sx={{ fontFamily: 'AvenirLTPro-Heavy' }}>
                          {currencyType}
                          {totAmountPlacOrder?.nonSwanOrders?.toLocaleString() || 0}
                          {/* 150,235 */}
                        </Heading5>
                        <Text as="span" className={classes.salesConversionText} sx={{ fontFamily: 'AvenirLTPro-Book', fontWeight: '400!important' }}>placed orders</Text>
                      </Flex>
                      <Flex mb={theme.marginSpacing.s} flexWrap="wrap">
                        <Heading5 mr="4px" className={classes.salesConversionText} sx={{ fontFamily: 'AvenirLTPro-Heavy', color: '#5932F3 !important' }}>
                          {currencyType}
                          {/* 82,345 */}
                          {totAmountPlacOrder?.swanOrders?.toLocaleString() || 0}
                        </Heading5>
                        <Text as="span" mb={theme.marginSpacing.s} className={classes.salesConversionText} sx={{ fontFamily: 'AvenirLTPro-Book', color: '#5932F3 !important', fontWeight: '400!important' }}>
                          {lastSalesDiff?.nonSwanOrders?.valDiff > 0
                            ? 'more so far'
                            : 'less so far'}
                        </Text>
                      </Flex>
                    </FlexBox>
                    <FlexBox
                      vertical
                      px="15px"
                      width="90%"
                      sx={{ border: '1px solid #EFEFEF', borderRadius: '6px' }}
                    >
                      <Heading3
                        my={theme.marginSpacing.s}
                        className={classes.salesConversionTitle}
                      >
                        Statistics
                      </Heading3>
                      <Flex flexWrap="wrap">
                        <Heading5 mr="4px" className={classes.salesConversionText} sx={{ fontFamily: 'AvenirLTPro-Heavy' }}>
                          {/* +2.4% */}
                          {lastSalesDiff?.nonSwanOrders?.percentageDiff.toFixed(2)}
                          %
                        </Heading5>
                        <Text as="span" mb={theme.marginSpacing.s} className={classes.salesConversionText} sx={{ fontFamily: 'AvenirLTPro-Book', fontWeight: '400!important' }}>
                          change from last month
                          {/* {salesFilterType === 'Last month' && 'Change from last month' }
                        { salesFilterType === 'Last week' && 'Changes from last week' }
                        { salesFilterType === 'Last quarter' && 'Changes from last quarter' } */}
                        </Text>
                      </Flex>
                      <Flex mb={theme.marginSpacing.s} flexWrap="wrap">
                        <Heading5 mr="4px" className={classes.salesConversionText} sx={{ fontFamily: 'AvenirLTPro-Heavy', color: '#5932F3 !important' }}>
                          {currencyType}
                          {/* 3,435 */}
                          {lastSalesDiff?.nonSwanOrders?.valDiff.toLocaleString() || 0}
                        </Heading5>
                        <Text as="span" mb={theme.marginSpacing.s} className={classes.salesConversionText} sx={{ fontFamily: 'AvenirLTPro-Book', color: '#5932F3 !important', fontWeight: '400!important' }}>
                          from Swan users
                        </Text>
                      </Flex>
                    </FlexBox>
                    {/* <Text
                    mt={[theme.marginSpacing.s, theme.marginSpacing.s]}
                    sx={{ fontSize: '14px' }}
                  >
                    Total
                    {' '}
                    {currencyType}
                    {' '}
                    amount of placed orders
                  </Text>
                  <Heading3
                    mt={[theme.marginSpacing.m, theme.marginSpacing.s]}
                    sx={{ fontSize: '24px' }}
                  >
                    {currencyType}
                    {totAmountPlacOrder?.nonSwanOrders?.toLocaleString() || 0}
                    150,235
                  </Heading3>
                  <Box
                    mt={[theme.marginSpacing.s, theme.marginSpacing.s]}
                    sx={{
                      fontSize: '16px',
                      height: '33px',
                      background: 'rgba(123, 123, 123, 0.11)',
                      borderRadius: '4px',
                      color: theme.colors.primary,
                      width: ' fit-content',
                      padding: '0 10px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Text
                      mr="4px"
                      sx={{
                        fontWeight: theme.fontWeights.extrabold
                      }}
                    >
                      {currencyType}
                      82,345
                      {totAmountPlacOrder?.swanOrders?.toLocaleString() || 0}
                    </Text>
                    {' '}
                    from Swan users
                  </Box>
                  <Heading5
                    mt={[theme.marginSpacing.m, theme.marginSpacing.m]}
                    sx={{ fontSize: '16px' }}
                  >
                    {' '}
                    {`Change from ${salesFilterType.toLowerCase()}`}
                    {salesFilterType === 'Last month' && 'Change from last month' }
                    { salesFilterType === 'Last week' && 'Changes from last week' }
                    { salesFilterType === 'Last quarter' && 'Changes from last quarter' }
                  </Heading5>
                  <Text
                    mt={[theme.marginSpacing.s, theme.marginSpacing.s]}
                    sx={{ fontWeight: theme.fontWeights.extrabold }}
                  >
                    +2.4%
                    {lastSalesDiff?.nonSwanOrders?.percentageDiff.toFixed(2)}
                    %
                  </Text>
                  <Box
                    mt={theme.marginSpacing.s}
                    sx={{
                      background: 'rgba(123, 123, 123, 0.11)',
                      borderRadius: '4px',
                      width: ' fit-content',
                      padding: '0 10px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Heading5 mr="4px">
                      {currencyType}
                      3,435
                      {lastSalesDiff?.nonSwanOrders?.valDiff.toLocaleString() || 0}
                    </Heading5>
                    {' '}
                    {lastSalesDiff?.nonSwanOrders?.valDiff > 0
                      ? 'more so far'
                      : 'less so far'}
                  </Box> */}
                  </FlexBox>
                </Box>
                <Box
                  className="chartBox"
                  width={['100%', '90%', '90%', '65%']}
                  mt={[theme.marginSpacing.m, theme.marginSpacing.xl]}
                  // padding={['10px', 'unset']}
                  paddingLeft={['5px', '15px', '30px', 'unset']}
                >
                  {/* <Box width={"472px"} height={"336px"}> */}
                  <UsersNonUsers
                    title=""
                    salesData={salesOrder}
                    type={salesFilterType}
                    currencyType={currencyType}
                    labelOrder={labelOrder}
                  />
                  <Box
                    mt={[theme.marginSpacing.s, 'unset']}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'row-reverse',
                      fontFamily: theme.fonts.button
                    }}
                  >
                    <Box
                      px={2}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: theme.fontWeights.extrabold,
                        color: '#686868',
                        fontSize: '13px'
                      }}
                    >
                      <Heading3 mr="4px">.</Heading3>
                      <Text> Non-Swan users</Text>
                    </Box>
                    <Box
                      px={2}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: theme.fontWeights.black,
                        color: '#5932F3',
                        fontSize: '13px'
                      }}
                    >
                      <Heading3 mr="4px">.</Heading3>
                      <Text>Swan users</Text>
                    </Box>
                  </Box>
                  {/* </Box> */}
                </Box>
              </FlexBox>
            </Box>

            <Box
              className="chartBox"
              width={['100%', '100%', '100%', 1 / 2]}
              paddingRight={['unset', 0, 0, theme.marginSpacing.s]}
              paddingBottom={['unset', theme.marginSpacing.s]}
              mt={[theme.marginSpacing.s, theme.marginSpacing.s]}
            >
              <Box
                p={['10px', 4]}
                sx={{
                  // border: '1px solid rgba(197, 197, 197, 0.1)',
                  // boxShadow: '0px 2px 8px rgba(82, 82, 82, 0.09)'
                  background: '#FFFFFF',
                  border: '1px solid #F4F4F4',
                  boxShadow: '0px 2px 5px rgba(82, 82, 82, 0.05)',
                  borderRadius: '8px'
                }}
              >
                <Heading4
                  ml={['22px', '28px']}
                  mt={[theme.marginSpacing.m, 0]}
                  sx={{
                    fontWeight: theme.fontWeights.black,
                    fontFamily: theme.fonts.button,
                    fontSize: '20px'
                  }}
                >
                  Returns
                </Heading4>
                <Text
                  mt={theme.marginSpacing.s}
                  ml={['22px', '28px']}
                  fontSize="14px"
                  sx={{
                    fontWeight: theme.fontWeights.normal
                  }}
                >
                  Completed orders and how many of them were returned.
                </Text>
                <Box mt={theme.marginSpacing.xl}>
                  <UsersNonUsers
                    title="Returns"
                    salesData={returnOrders}
                    type={salesFilterType}
                    currencyType={currencyType}
                    labelOrder={labelOrder}
                  />
                  <Box
                    mt={[theme.marginSpacing.s, 'unset']}
                    mb={[theme.marginSpacing.s, 'unset']}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'row-reverse',
                      fontFamily: theme.fonts.button
                    }}
                  >
                    <Box
                      px={2}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: theme.fontWeights.extrabold,
                        color: '#686868',
                        fontSize: '13px'
                      }}
                    >
                      <Heading3 mr="4px">.</Heading3>
                      <Text> Non-Swan users</Text>
                    </Box>
                    <Box
                      px={2}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: theme.fontWeights.extrabold,
                        color: '#5932F3',
                        fontSize: '13px'
                      }}
                    >
                      <Heading3 mr="4px">.</Heading3>
                      <Text>Swan users</Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box
              className="chartBox"
              // paddingLeft={['unset', 2]}
              width={['100%', '100%', '100%', 1 / 2]}
              mb={theme.marginSpacing.s}
              mt={[theme.marginSpacing.s, 0, 0, theme.marginSpacing.s]}
            >
              <Box
                p={['10px', 4]}
                sx={{
                  background: '#FFFFFF',
                  border: '1px solid #F4F4F4',
                  boxShadow: '0px 2px 5px rgba(82, 82, 82, 0.05)',
                  borderRadius: '8px'
                }}
              >
                <Heading4
                  ml={['22px', '28px']}
                  mt={[theme.marginSpacing.m, 0]}
                  sx={{
                    // fontWeight: theme.fontWeights.extrabold,
                    fontSize: '20px'
                  }}
                >
                  Swan ROI
                </Heading4>
                <Text
                  mt={theme.marginSpacing.s}
                  ml={['22px', '28px']}
                  fontSize="14px"
                  sx={{
                    fontWeight: theme.fontWeights.normal
                  }}
                >
                  Your return on investment for using Swan.
                </Text>
                <Box mt={theme.marginSpacing.xl} width="97.5%">
                  <SwanROI />
                  <Box
                    mt={[theme.marginSpacing.s, 'unset']}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'row-reverse',
                      fontFamily: theme.fonts.button
                    }}
                  >
                    <Box
                      px={2}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: theme.fontWeights.extrabold,
                        color: '#686868',
                        fontSize: '13px'
                      }}
                    >
                      <Heading3 mr="4px">.</Heading3>
                      <Text> Non-Swan users</Text>
                    </Box>
                    <Box
                      px={2}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: theme.fontWeights.extrabold,
                        color: '#5932F3',
                        fontSize: '13px'
                      }}
                    >
                      <Heading3 mr="4px">.</Heading3>
                      <Text>Investment</Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box
              className="chartBox"
              width={['100%', '100%', '100%', 1 / 2]}
              paddingRight={['unset', 0, 0, theme.marginSpacing.s]}
              // paddingBottom={['unset', theme.marginSpacing.s]}
              mb={theme.marginSpacing.s}
            >
              <Box
                p={['10px', 4]}
                sx={{
                  // border: '1px solid rgba(197, 197, 197, 0.1)',
                  // boxShadow: '0px 2px 8px rgba(82, 82, 82, 0.09)'
                  background: '#FFFFFF',
                  border: '1px solid #F4F4F4',
                  boxShadow: '0px 2px 5px rgba(82, 82, 82, 0.05)',
                  borderRadius: '8px'
                }}
              >
                <Box
                  display="inline-flex"
                  mt={[theme.marginSpacing.m, 0]}
                  sx={{ alignItems: 'center' }}
                >
                  <Heading4
                    ml={['22px', '28px']}
                    sx={{
                      fontWeight: theme.fontWeights.black,
                      fontFamily: theme.fonts.button,
                      fontSize: '20px'
                    }}
                  >
                    Fit View sessions
                  </Heading4>
                  <Text
                    pl="20px"
                    color="primary"
                    sx={{ fontWeight: theme.fontWeights.extrabold }}
                  >
                    {/* +3.7% need to discuss */}
                  </Text>
                </Box>
                <Heading4
                  ml={['22px', '28px']}
                  mt={theme.marginSpacing.s}
                  sx={{
                    fontWeight: theme.fontWeights.black,
                    color: '#0C0C0C',
                    fontSize: '16px'
                  }}
                >
                  {responseData && responseData?.fitViewClicked
                    && responseData?.fitViewClicked?.length.toLocaleString()}
                  {/* 75,235 */}
                </Heading4>
                <Text
                  mt={theme.marginSpacing.s}
                  ml={['22px', '28px']}
                  fontSize="14px"
                  sx={{
                    fontWeight: theme.fontWeights.normal
                  }}
                >
                  Total amount of times customers have opened Fit View
                </Text>
                <Box mt={[theme.marginSpacing.xl, 'unset']} mb={theme.marginSpacing.m}>
                  <UsersNonUsers
                    title="Fit View sessions"
                    salesData={fitViewClickOrders}
                    type={salesFilterType}
                    currencyType={currencyType}
                    labelOrder={labelOrder}
                  />
                </Box>
              </Box>
            </Box>

            <Box
              className="chartBox"
              width={['100%', '100%', '100%', 1 / 2]}
              mb={theme.marginSpacing.s}
            >
              <Box
                p={['10px', 4]}
                sx={{
                  background: '#FFFFFF',
                  border: '1px solid #F4F4F4',
                  boxShadow: '0px 2px 5px rgba(82, 82, 82, 0.05)',
                  borderRadius: '8px'
                }}
              >
                <Heading4
                  ml={['22px', '28px']}
                  mt={[theme.marginSpacing.m, 0]}
                  sx={{
                    fontSize: '20px'
                  }}
                >
                  Sales by Fit Type
                </Heading4>
                <Box
                  width={['100%', '50.8%']}
                  margin="auto"
                  mt={[theme.marginSpacing.xl, theme.marginSpacing.m]}
                >
                  <SalesByFitType title="Sales by Fit Type" />
                </Box>
                {' '}
                <Box
                  mt={[theme.marginSpacing.s, theme.marginSpacing.m]}
                  justifyContent={['unset', 'space-between']}
                  flexWrap={['wrap', 'unset']}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    fontFamily: theme.fonts.button,
                    fontSize: '14px'
                  }}
                >
                  <Box
                    px={2}
                    width={['53%', 'auto']}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',

                      color: '#5932F3'
                    }}
                  >
                    <Heading3 mr="6px">.</Heading3>
                    <Text>Best Match (52%)</Text>
                  </Box>
                  <Box
                    width={['47%', 'auto']}
                    px={2}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: '#7958FE',
                      fontFamily: theme.fonts.button
                    }}
                  >
                    <Heading3 mr="6px">.</Heading3>
                    <Text> Tight Fit (24%)</Text>
                  </Box>
                  <Box
                    mt={['12px', 'unset']}
                    width={[1 / 2, 'auto']}
                    px={2}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',

                      color: '#C0B4F2'
                    }}
                  >
                    <Heading3 mr="6px">.</Heading3>
                    <Text>Oversized (32%)</Text>
                  </Box>
                </Box>

              </Box>
            </Box>

            {/* <Box
              className="chartBox"
              width={['unset', 1 / 2]}
              paddingRight={['unset', 2]}
              mt={theme.marginSpacing.s}
            >
              <Box
                p={['10px', 4]}
                sx={{
                  border: '1px solid rgba(197, 197, 197, 0.1)',

                  boxShadow: '0px 2px 8px rgba(82, 82, 82, 0.09)'
                }}
              >
                <Heading4
                  ml={['22px', '28px']}
                  mt={[theme.marginSpacing.m, '22px']}
                  sx={{
                    // fontWeight: theme.fontWeights.extrabold,
                    fontSize: '20px'
                  }}
                >
                  Order Types
                </Heading4>
                <Box
                  width={['100%', '53%']}
                  margin="auto"
                  mt={[theme.marginSpacing.xl, theme.marginSpacing.m]}
                >
                  <SalesByFitType title="Order Types" />
                </Box>
                <Box
                  mt={[theme.marginSpacing.s, theme.marginSpacing.m]}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    fontFamily: theme.fonts.button,
                    fontSize: '14px'
                  }}
                >
                  <Box
                    px={2}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',

                      color: '#5932F3'
                    }}
                  >
                    <Heading3 mr="6px">.</Heading3>
                    <Text>Personal (83%)</Text>
                  </Box>
                  <Box
                    px={4}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',

                      color: '#7958FE',

                      fontFamily: theme.fonts.button
                    }}
                  >
                    <Heading3 mr="6px">.</Heading3>
                    <Text>Gift (17%)</Text>
                  </Box>
                </Box>
              </Box>
            </Box> */}
            <FlexBox
              width="100%"
              // height="80px"
              py={theme.marginSpacing.m}
              px="25px"
              alignItems="center"
              flexWrap="wrap"
              // mt={[theme.marginSpacing.s, 0]}
              sx={{
                background: '#FFFFFF',
                borderTop: '1px solid #F4F4F4',
                boxShadow: '0px 0px 4px rgba(68, 68, 68, 0.14)',
                borderRadius: '6px'
              }}
            >
              <Text
                sx={{
                  flexGrow: 1,
                  fontFamily: 'AvenirLTPro-Book',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '150%',
                  color: '#0C0C0C'
                }}
              >
                Want to talk with us about your numbers?
              </Text>
              <Button
                mt={[theme.marginSpacing.m, theme.marginSpacing.m, theme.marginSpacing.m, 0]}
                sx={{
                  width: '158.79px',
                  height: '39px',
                  background: '#5932F3',
                  border: '1px solid rgba(197, 197, 197, 0.1)',
                  boxSizing: 'border-box',
                  boxShadow: '0px 2px 4px rgba(155, 155, 155, 0.25)',
                  borderRadius: '6px',
                  fontFamily: theme.fonts.button,
                  cursor: 'pointer'
                }}
                onClick={() => window.open('https://calendly.com/eoinswan')}
              >
                <Text sx={{ fontSize: '13px' }}>Book a call with us</Text>
              </Button>
            </FlexBox>
          </FlexBox>
        </Box>
      </FlexBox>
    </Box>
  );
}
