/*
 * A smart barcode scanner for react-native apps
 * https://github.com/react-native-component/react-native-smart-barcode/
 * Released under the MIT license
 * Copyright (c) 2016 react-native-component <moonsunfall@aliyun.com>
 */


import React, {
    Component,
} from 'react'
import {
    View,
    requireNativeComponent,
    NativeModules,
    AppState,
    Platform,
    ViewPropTypes
} from 'react-native'
import PropTypes from 'prop-types'

const BarcodeManager = Platform.OS == 'ios' ? NativeModules.Barcode : NativeModules.CaptureModule

export const decodeQR = Platform.OS == 'ios' ? NativeModules.QRCodeLocalImage.decodeQR : NativeModules.CaptureModule.decodeQR;

export default class Barcode extends Component {

    static defaultProps = {
        barCodeTypes: Object.values(BarcodeManager.barCodeTypes),
        scannerRectWidth: 255,
        scannerRectHeight: 255,
        scannerRectTop: 0,
        scannerRectLeft: 0,
        scannerLineInterval: 3000,
        scannerRectCornerColor: `#09BB0D`,
        torchMode: 0,
    }

    static propTypes = {
        ...ViewPropTypes,
        onBarCodeRead: PropTypes.func.isRequired,
        barCodeTypes: PropTypes.array,
        scannerRectWidth: PropTypes.number,
        scannerRectHeight: PropTypes.number,
        scannerRectTop: PropTypes.number,
        scannerRectLeft: PropTypes.number,
        scannerLineInterval: PropTypes.number,
        scannerRectCornerColor: PropTypes.string,
        torchMode: PropTypes.number,
    }

    render() {
        return (
            <NativeBarCode
                {...this.props}
            />
        )
    }

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
    }
    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    startScan() {
        BarcodeManager.startSession()
    }

    stopScan() {
        BarcodeManager.stopSession()
    }

    _handleAppStateChange = (currentAppState) => {
        if(currentAppState !== 'active' ) {
            this.stopScan()
        }
        else {
            this.startScan()
        }
    }
}

export const BarCodeTypes = {
    upce: 'upce',
    code39: 'code39',
    //ios only
    code39mod43: 'code39mod43',
    ean13: 'ean13',
    ean8: 'ean8',
    code93: 'code93',
    code128: 'code128',
    pdf417: 'pdf417',
    qr: 'qr',
    aztec: 'aztec',
    //ios only
    interleaved2of5: 'interleaved2of5',
    itf14: 'itf14',
    datamatrix: 'datamatrix'
}

const NativeBarCode = requireNativeComponent(Platform.OS == 'ios' ? 'RCTBarcode' : 'CaptureView', Barcode)
