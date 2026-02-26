import React from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyDevice } from '../api';

export default function DeviceVerification() {
  const navigate = useNavigate();
  const handleWebAuthn = async () => {
    // TODO: integrate real WebAuthn flow
    const student = JSON.parse(localStorage.getItem('student') || '{}');
    const res = await verifyDevice({
      studentId: student.studentId,
      method: 'webauthn',
    });
    if (res.success) navigate('/lecture');
  };

  const handlePhoto = async () => {
    // TODO: capture photo and send to backend
    const student = JSON.parse(localStorage.getItem('student') || '{}');
    const res = await verifyDevice({
      studentId: student.studentId,
      method: 'photo',
    });
    if (res.success) navigate('/lecture');
  };

  return (
    <div className="container">
      <h2>Device verification</h2>
      <p>Use your registered device or fall back to a live photo.</p>
      <button onClick={handleWebAuthn}>Use biometrics (WebAuthn)</button>
      <button onClick={handlePhoto}>Use camera/photo</button>
    </div>
  );
}
