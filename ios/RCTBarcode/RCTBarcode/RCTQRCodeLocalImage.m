//
//  RCTQRCodeLocalImage.m
//  RCTQRCodeLocalImage
//
//  Created by fangyunjiang on 15/11/4.
//  Copyright (c) 2015年 remobile. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <React/RCTLog.h>
#import <React/RCTUtils.h>
#import "RCTQRCodeLocalImage.h"

@implementation RCTQRCodeLocalImage
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(decodeQR:(NSString *)path pathWithResolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    UIImage *srcImage;
    if ([path hasPrefix:@"http://"] || [path hasPrefix:@"https://"]) {
        srcImage = [UIImage imageWithData: [NSData dataWithContentsOfURL:[NSURL URLWithString: path]]];
    } else {
        srcImage = [[UIImage alloc] initWithContentsOfFile:path];
    }
    if (nil==srcImage){
        NSLog(@"PROBLEM! IMAGE NOT LOADED\n");
        reject(@"no_events", @"cannot load imag", nil);
        return;
    }
    NSLog(@"OK - IMAGE LOADED\n");
    NSDictionary *detectorOptions = @{@"CIDetectorAccuracy": @"CIDetectorAccuracyHigh"};
    CIDetector *detector = [CIDetector detectorOfType:CIDetectorTypeQRCode context:nil options:detectorOptions];
    CIImage *image = [CIImage imageWithCGImage:srcImage.CGImage];
    NSArray *features = [detector featuresInImage:image];
    if (0==features.count) {
        NSLog(@"PROBLEM! Feature size is zero!\n");
        reject(@"no_events", @"feature size is zero", nil);
        return;
    }
    
    CIQRCodeFeature *feature = [features firstObject];
    
    NSString *result = feature.messageString;
    NSLog(@"result: %@", result);
    
    if (result) {
        resolve(result);
    } else {
        reject(@"no_events", @"decode error", nil);
        return;
    }
}
@end
