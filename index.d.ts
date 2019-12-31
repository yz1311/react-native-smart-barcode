import {
    ViewProps
} from 'react-native';
import { Component, RefForwardingComponent } from 'react';

export interface BarCodeReadEvent {
    nativeEvent: {
        data: {
            code: string,
            type: string
        }
    }
}

export enum BarCodeTypes {
    'upce',
    'code39',
    //ios only
    'code39mod43',
    'ean13',
    'ean8',
    'code93',
    'code128',
    'pdf417',
    'qr',
    'aztec',
    //ios only
    'interleaved2of5',
    'itf14',
    'datamatrix'
}

interface IBarcodeProps extends ViewProps{
    onBarCodeRead: (e:BarCodeReadEvent)=>void,
    barCodeTypes?: Array<BarCodeTypes>,
    scannerRectWidth?: number,
    scannerRectHeight?: number,
    scannerRectTop?: number,
    scannerRectLeft?: number,
    scannerLineInterval?: number,
    scannerRectCornerColor?: string,
    torchMode?: number,
}

export declare function decodeQR(localPath:string): Promise<string>;

export default class Barcode extends Component<IBarcodeProps> {

}
