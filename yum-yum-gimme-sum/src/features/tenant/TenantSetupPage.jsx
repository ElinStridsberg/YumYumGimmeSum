import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TenantSetup from './TenantSetup';

function TenantSetupPage() {
  const [tenant, setTenant] = useState(null);
  const navigate = useNavigate();

  const handleTenantCreated = (tenantData) => {
    setTenant(tenantData);
    localStorage.setItem('tenant', JSON.stringify(tenantData));
    navigate('/menu');
  };

  if (tenant) {
    return <p>Tenant skapad! Navigerar till menyn...</p>;
  }

  return (
    <div>
      <h1>Skapa din foodtruck</h1>
      <TenantSetup onTenantCreated={handleTenantCreated} />
    </div>
  );
}

export default TenantSetupPage;
