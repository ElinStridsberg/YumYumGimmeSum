import React, { useState } from 'react';
import { useCreateTenantMutation } from './tenantSlice';

function TenantSetup({ onTenantCreated }) {
  const [tenantName, setTenantName] = useState('');
  const [createTenant, { isLoading, error }] = useCreateTenantMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tenantName.trim()) return;

    try {
      const result = await createTenant(tenantName).unwrap();
      onTenantCreated(result);
    } catch (err) {
      console.error('Misslyckades skapa tenant:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Namn på foodtruck:
        <input
          type="text"
          value={tenantName}
          onChange={(e) => setTenantName(e.target.value)}
          disabled={isLoading}
          autoFocus
        />
      </label>
      <button type="submit" disabled={isLoading}>
        Skapa Tenant
      </button>
      {error && <p>Fel vid skapande av tenant.</p>}
    </form>
  );
}

export default TenantSetup;
