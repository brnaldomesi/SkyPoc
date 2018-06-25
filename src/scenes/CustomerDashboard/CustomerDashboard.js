import React from 'react';
import AddressWidget from './Widgets/AddressWidget';
import MarketSegmentWidget from './Widgets/MarketSegmentWidget';
import PreviousDeliveryWidget from './Widgets/PreviousDeliveryWidget';
import PendingOrderWidget from './Widgets/PendingOrderWidget';
import InteractionLogWidget from './Widgets/InteractionLogWidget';
import ContactsWidget from './Widgets/ContactsWidget';
import ComplaintsWidget from './Widgets/ComplaintsWidget';
import ReadingsWidget from './Widgets/ReadingsWidget';
import ReadingsGraphWidget from './Widgets/ReadingsGraphWidget';
import DORWidget from './Widgets/DORWidget';
import MapWidget from './Widgets/MapWidget';
import TankLevelWidget from './Widgets/TankLevelWidget';
import AlertWidget from './Widgets/AlertWidget';
import ImageWidget from './Widgets/ImageWidget';
import ProductionScheduleWidget from './Widgets/ProductionScheduleWidget';
import DeliveryWindowWidget from './Widgets/DeliveryWindowWidget';


const CustomerDashboard = (props) => {

    return (
        <div style={{fontSize:14, lineHeight:1.1}}>

            {/* Row 1 */}
            <div className="row">
                <div className="col-xs-12 col-sm-4 col-md-4 col-lg-3 m-b-15 ">
                    <ImageWidget marginTop={0} height={125} />
                    <MapWidget marginTop={20} height={128} />
                    <TankLevelWidget marginTop={20} height={128} />
                    <DORWidget marginTop={20} height={128} />
                    <ReadingsWidget marginTop={20} height={128} />
                    <AlertWidget marginTop={20} height={128} />
                </div>

                <div className="col-xs-12 col-sm-4 col-md-4 col-lg-6 m-b-15 ">
                    <AddressWidget marginTop={0} height={125} />
                    <PendingOrderWidget marginTop={20} height={128} />
                    <PreviousDeliveryWidget marginTop={20} height={128} />
                    <InteractionLogWidget marginTop={20} height={128} />
                    <ContactsWidget marginTop={20} height={128} />
                    <ComplaintsWidget marginTop={20} height={128} />
                </div>

                <div className="col-xs-12 col-sm-4 col-md-4 col-lg-3 m-b-15 ">
                    <MarketSegmentWidget marginTop={0} height={125} />
                    <ReadingsGraphWidget marginTop={20} height={128} />
                    <ProductionScheduleWidget marginTop={20} height={276} />
                    <DeliveryWindowWidget marginTop={20} height={276} />
                </div>
            </div>

        </div>
    );
};

export default CustomerDashboard;
