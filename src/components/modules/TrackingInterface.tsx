
import { TrackingInterface as TrackingInterfaceComponent } from "./tracking/TrackingInterface";

export function TrackingInterface(props: { moduleName: string }) {
  return <TrackingInterfaceComponent {...props} />;
}
