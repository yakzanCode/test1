// components/PlaceOrder.jsx
import React, { useState } from 'react';
import { sendOrderViaWhatsApp } from '../utils/firstUtils';

const PlaceOrder = ({ cart, cartTotal }) => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        location: '',
        phone: '',
        notes: ''
    });

    const [formError, setFormError] = useState('');
    const [loading, setLoading] = useState(false);
    const [orderSent, setOrderSent] = useState(false);

    const isFormValid = form.firstName && form.lastName && form.location;
    const isValidPhone = (phone) => {
        const regex = /^\+?[0-9]{7,15}$/;
        return phone === '' || regex.test(phone); // Allow empty, but validate if entered
    };

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSendOrder = () => {
        setLoading(true);

        // Anti-bot honeypot check
        if (form.website) {
            setFormError('Bot submission blocked.');
            setLoading(false);
            return;
        }
        // Phone validation
        if (!isValidPhone(form.phone)) {
            setFormError('Please enter a valid phone number.');
            setLoading(false);
            return;
        }

        const result = sendOrderViaWhatsApp(form, cart, cartTotal);

        if (result === 'Please fill in all required fields.') {
            setFormError(result);
            setLoading(false);
            return;
        }

        setFormError('');
        setOrderSent(true);
        setLoading(false);
    };

    return (
        <div className="mt-4">
            <h5>Customer Info</h5>

            {formError && <div className="alert alert-danger">{formError}</div>}
            {orderSent && (
                <div className="alert alert-success">
                    ✅ Order sent successfully! You can follow up via WhatsApp.
                </div>
            )}

            <div className="row">
                {/* Honeypot field */}
                <input
                    type="text"
                    name="website"
                    value={form.website}
                    onChange={handleInputChange}
                    style={{ display: 'none' }}
                    autoComplete="off"
                />

                <div className="col-md-6 mb-2">
                    <input type="text" name="firstName" className="form-control" placeholder="First Name *" value={form.firstName} onChange={handleInputChange} />
                </div>
                <div className="col-md-6 mb-2">
                    <input type="text" name="lastName" className="form-control" placeholder="Last Name *" value={form.lastName} onChange={handleInputChange} />
                </div>
                <div className="col-12 mb-2">
                    <input type="text" name="location" className="form-control" placeholder="Location *" value={form.location} onChange={handleInputChange} />
                </div>
                <div className="col-12 mb-2">
                    <input type="text" name="phone" className="form-control" placeholder="Phone (optional)" value={form.phone} onChange={handleInputChange} />
                </div>
                <div className="col-12 mb-3">
                    <textarea name="notes" className="form-control" placeholder="Notes (optional)" rows="2" value={form.notes} onChange={handleInputChange}></textarea>
                </div>
                <div className="col-12 text-end">
                    <button className="btn btn-dark text-white" onClick={handleSendOrder} disabled={!isFormValid || loading}>
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Sending...
                            </>
                        ) : (
                            'Send Order via WhatsApp'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;
