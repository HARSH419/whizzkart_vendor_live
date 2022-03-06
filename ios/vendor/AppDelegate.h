#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import <GoogleMaps/GoogleMaps.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>

[GMSServices provideAPIKey:@"_YOUR_API_KEY_"]; // add this line using the api key obtained from Google Console
@property (nonatomic, strong) UIWindow *window;

@end
