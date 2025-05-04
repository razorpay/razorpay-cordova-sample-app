#import "Main.h"

typedef RazorpayCheckout Razorpay;

@interface Main () <RazorpayPaymentCompletionProtocolWithData, ExternalWalletSelectionProtocol> {
  Razorpay *razorpay;
}

@end

@implementation Main

- (void)open:(CDVInvokedUrlCommand *)command {

  NSDictionary *options = [NSJSONSerialization
      JSONObjectWithData:[[[command arguments] objectAtIndex:0]
                             dataUsingEncoding:NSUTF8StringEncoding]
                 options:0
                   error:nil];

  razorpay = [Razorpay initWithKey:(NSString *)[options objectForKey:@"key"]
               andDelegateWithData:self];
  [razorpay setExternalWalletSelectionDelegate:self];

  self.callbackId = [command callbackId];
  NSMutableDictionary * tempOptions = [[NSMutableDictionary alloc] initWithDictionary:options];
  tempOptions[@"integration_version"] = CDV_VERSION;
  tempOptions[@"integration"] = @"cordova";
  tempOptions[@"FRAMEWORK"] = @"cordova";
  [razorpay open:tempOptions];
}

- (void)onPaymentError:(int)code
           description:(nonnull NSString *)str
               andData:(nullable NSDictionary *)response {
  CDVPluginResult *result = [CDVPluginResult
         resultWithStatus:CDVCommandStatus_ERROR
      messageAsDictionary:[NSDictionary dictionaryWithObjectsAndKeys:
                                            [NSNumber numberWithInt:code],
                                            @"code", str, @"description",
                                            response, @"response", nil]];
  [self.commandDelegate sendPluginResult:result callbackId:self.callbackId];
}

- (void)onPaymentSuccess:(nonnull NSString *)payment_id
                 andData:(nullable NSDictionary *)response {
  CDVPluginResult *result =
      [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                    messageAsDictionary:response];
  [self.commandDelegate sendPluginResult:result callbackId:self.callbackId];
}

- (void)onExternalWalletSelected:(NSString * _Nonnull)walletName withPaymentData:(NSDictionary * _Nullable)paymentData {
  CDVPluginResult *result = [CDVPluginResult
         resultWithStatus:CDVCommandStatus_ERROR
      messageAsDictionary:[NSDictionary dictionaryWithObjectsAndKeys:
                                            walletName, @"external_wallet_name",
                                            paymentData[@"contact"], @"contact",
                                            paymentData[@"email"], @"email", nil]];
  [self.commandDelegate sendPluginResult:result callbackId:self.callbackId];
}

@end
