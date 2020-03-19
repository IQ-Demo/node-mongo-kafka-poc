import { addNewLease, getLease, getLeaseWithId, updateLease, deleteLease } from '../controllers/leaseControllers';
import { addNewPayment, getPayment, getPaymentWithId, updatePayment, deletePayment } from '../controllers/paymentControllers';
import { addNewDisclaimer, getDisclaimer, getDisclaimerWithId, updateDisclaimer, deleteDisclaimer } from '../controllers/disclaimerControllers';
import { addNewVehicle, getVehicle, getVehicleWithId, updateVehicle, deleteVehicle } from '../controllers/vehicleControllers';
import { addNewInsurance, getInsurance, getInsuranceWithId, updateInsurance, deleteInsurance } from '../controllers/InsuranceControllers';



const routes = (app) => {

    // Lease ---------------------------------------------------
    app.route('/lease')
    // get all leases
    .get(getLease)

    // Post Lease
    .post(addNewLease);

    app.route('/lease/:LeaseId')
    // get specific lease
    .get(getLeaseWithId)
    // update specific lease
    .put(updateLease)
    // delete lease
    .delete(deleteLease)

    // Payments ------------------------------------------------

    app.route('/payment')
    // get all Payments
    .get(getPayment)

    // Post Payment
    .post(addNewPayment);

    app.route('/Payment/:PaymentId')
    // get specific Payment
    .get(getPaymentWithId)
    // update specific Payment
    .put(updatePayment)
    // delete Payment
    .delete(deletePayment)

    // Disclaimer ---------------------------------------------------
    app.route('/disclaimer')
    // get all Disclaimers
    .get(getDisclaimer)

    // Post Disclaimer
    .post(addNewDisclaimer);

    app.route('/Disclaimer/:DisclaimerId')
    // get specific Disclaimer
    .get(getDisclaimerWithId)
    // update specific Disclaimer
    .put(updateDisclaimer)
    // delete Disclaimer
    .delete(deleteDisclaimer)

    // Vehicle ---------------------------------------------------
    app.route('/vehicle')
    // get all Vehicles
    .get(getVehicle)

    // Post Vehicle
    .post(addNewVehicle);

    app.route('/Vehicle/:VehicleId')
    // get specific Vehicle
    .get(getVehicleWithId)
    // update specific Vehicle
    .put(updateVehicle)
    // delete Vehicle
    .delete(deleteVehicle)

    // Insurance ---------------------------------------------------
    app.route('/insurance')
    // get all Insurances
    .get(getInsurance)

    // Post Insurance
    .post(addNewInsurance);

    app.route('/insurance/:InsuranceId')
    // get specific Insurance
    .get(getInsuranceWithId)
    // update specific Insurance
    .put(updateInsurance)
    // delete Insurance
    .delete(deleteInsurance)




}

export default routes;