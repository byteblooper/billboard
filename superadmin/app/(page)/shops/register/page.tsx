'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ManagerForm,
  ShopForm,
  ReviewStep,
  StepIndicator,
  SuccessModal,
  ShopManagerInfo,
  ShopInfo,
  ShopRegistrationData,
  RegistrationStep,
  FormErrors,
} from './components';

const initialManagerData: ShopManagerInfo = {
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  phone: '',
};

const initialShopData: ShopInfo = {
  shopName: '',
  description: '',
  shop_contact_email: '',
  shop_contact_phone: '',
  shop_contact_address: '',
  location_city: '',
  location_zone: '',
  trade_licence: '',
  shop_open_at: '09:00',
  shop_close_at: '18:00',
};

export default function ShopRegistrationPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<RegistrationStep>('manager');
  const [managerData, setManagerData] = useState<ShopManagerInfo>(initialManagerData);
  const [shopData, setShopData] = useState<ShopInfo>(initialShopData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [completedSteps, setCompletedSteps] = useState<Set<RegistrationStep>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleManagerChange = useCallback((field: keyof ShopManagerInfo, value: string) => {
    setManagerData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const handleShopChange = useCallback((field: keyof ShopInfo, value: string) => {
    setShopData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const validateManagerStep = (): boolean => {
    const newErrors: FormErrors = {};

    if (!managerData.name.trim()) newErrors.name = 'Full name is required';
    if (!managerData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(managerData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!managerData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?\d[\d\s-]{8,}$/.test(managerData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!managerData.password) {
      newErrors.password = 'Password is required';
    } else if (managerData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/[A-Z]/.test(managerData.password)) {
      newErrors.password = 'Password must contain an uppercase letter';
    } else if (!/[a-z]/.test(managerData.password)) {
      newErrors.password = 'Password must contain a lowercase letter';
    } else if (!/\d/.test(managerData.password)) {
      newErrors.password = 'Password must contain a number';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(managerData.password)) {
      newErrors.password = 'Password must contain a special character';
    }
    if (!managerData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (managerData.password !== managerData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateShopStep = (): boolean => {
    const newErrors: FormErrors = {};

    if (!shopData.shopName.trim()) newErrors.shopName = 'Shop name is required';
    if (!shopData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (shopData.description.length > 500) {
      newErrors.description = 'Description must be 500 characters or less';
    }
    if (!shopData.shop_contact_email.trim()) {
      newErrors.shop_contact_email = 'Contact email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shopData.shop_contact_email)) {
      newErrors.shop_contact_email = 'Invalid email format';
    }
    if (!shopData.shop_contact_phone.trim()) {
      newErrors.shop_contact_phone = 'Contact phone is required';
    }
    if (!shopData.shop_contact_address.trim()) newErrors.shop_contact_address = 'Address is required';
    if (!shopData.location_city) newErrors.location_city = 'City is required';
    if (!shopData.location_zone) newErrors.location_zone = 'Zone is required';
    if (!shopData.trade_licence.trim()) newErrors.trade_licence = 'Trade license is required';
    if (!shopData.shop_open_at) newErrors.shop_open_at = 'Opening time is required';
    if (!shopData.shop_close_at) newErrors.shop_close_at = 'Closing time is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 'manager') {
      if (validateManagerStep()) {
        setCompletedSteps((prev) => new Set([...prev, 'manager']));
        setCurrentStep('shop');
      }
    } else if (currentStep === 'shop') {
      if (validateShopStep()) {
        setCompletedSteps((prev) => new Set([...prev, 'shop']));
        setCurrentStep('review');
      }
    }
  };

  const handleBack = () => {
    if (currentStep === 'shop') setCurrentStep('manager');
    else if (currentStep === 'review') setCurrentStep('shop');
  };

  const handleStepClick = (step: RegistrationStep) => {
    setCurrentStep(step);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const payload: ShopRegistrationData = {
      manager: managerData,
      shop: shopData,
    };

    // Simulate API call
    console.log('Submitting registration:', JSON.stringify({
      email: payload.manager.email,
      password: payload.manager.password,
      name: payload.manager.name,
      phone: payload.manager.phone,
      shopName: payload.shop.shopName,
      description: payload.shop.description,
      shop_contact_email: payload.shop.shop_contact_email,
      shop_contact_phone: payload.shop.shop_contact_phone,
      shop_contact_address: payload.shop.shop_contact_address,
      location_city: payload.shop.location_city.toLowerCase(),
      location_zone: payload.shop.location_zone,
      trade_licence: payload.shop.trade_licence,
      shop_open_at: payload.shop.shop_open_at,
      shop_close_at: payload.shop.shop_close_at,
    }, null, 2));

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setShowSuccess(true);
  };

  const handleRegisterAnother = () => {
    setManagerData(initialManagerData);
    setShopData(initialShopData);
    setCurrentStep('manager');
    setCompletedSteps(new Set());
    setErrors({});
    setShowSuccess(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/shops" className="hover:text-indigo-600 transition-colors">
              Shops
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900">Register New Shop</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Register Shop + Manager</h1>
          <p className="text-sm text-gray-500 mt-1">
            Create a new shop and assign a shop manager account
          </p>
        </div>

        {/* Step Indicator */}
        <div className="mb-8">
          <StepIndicator
            currentStep={currentStep}
            onStepClick={handleStepClick}
            completedSteps={completedSteps}
          />
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 lg:p-8">
            {currentStep === 'manager' && (
              <ManagerForm
                data={managerData}
                errors={errors}
                onChange={handleManagerChange}
              />
            )}

            {currentStep === 'shop' && (
              <ShopForm
                data={shopData}
                errors={errors}
                onChange={handleShopChange}
              />
            )}

            {currentStep === 'review' && (
              <ReviewStep
                data={{ manager: managerData, shop: shopData }}
                onEdit={handleStepClick}
              />
            )}
          </div>

          {/* Actions */}
          <div className="px-6 lg:px-8 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <div>
              {currentStep !== 'manager' && (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/shops"
                className="px-4 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
              >
                Cancel
              </Link>
              {currentStep === 'review' ? (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Registering...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Register Shop
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Next
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* JSON Preview (Dev Only) */}
        <details className="mt-6">
          <summary className="text-sm text-gray-400 cursor-pointer hover:text-gray-600">
            API Payload Preview (Dev)
          </summary>
          <pre className="mt-2 bg-gray-900 text-green-400 text-xs p-4 rounded-lg overflow-x-auto">
            {JSON.stringify({
              email: managerData.email || 'shopowner@example.com',
              password: managerData.password ? '********' : 'Password123!',
              name: managerData.name || 'Shop Owner',
              phone: managerData.phone || '+201234567890',
              shopName: shopData.shopName || 'My Shop',
              description: shopData.description || 'A sample shop description',
              shop_contact_email: shopData.shop_contact_email || 'shop@example.com',
              shop_contact_phone: shopData.shop_contact_phone || '+201234567890',
              shop_contact_address: shopData.shop_contact_address || '123 Main St, Cairo',
              location_city: (shopData.location_city || 'dhaka').toLowerCase(),
              location_zone: shopData.location_zone || 'Downtown',
              trade_licence: shopData.trade_licence || 'TL-12345',
              shop_open_at: shopData.shop_open_at || '09:00',
              shop_close_at: shopData.shop_close_at || '18:00',
            }, null, 2)}
          </pre>
        </details>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccess}
        shopName={shopData.shopName}
        managerEmail={managerData.email}
        onClose={() => router.push('/shops')}
        onRegisterAnother={handleRegisterAnother}
      />
    </div>
  );
}
