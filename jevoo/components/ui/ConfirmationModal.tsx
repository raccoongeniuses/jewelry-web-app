'use client';

import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  itemName?: string;
}

export default function ConfirmationModal({ isOpen, onClose, onConfirm, message, itemName }: ConfirmationModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div
      className="modal fade show"
      style={{
        display: 'block',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999
      }}
      tabIndex={-1}
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: '400px' }}>
        <div className="modal-content" style={{ minHeight: '350px' }}>
          <div className="modal-body text-center p-4 d-flex flex-column justify-content-center" style={{ minHeight: '350px' }}>
            <div className="mb-3">
              <FiAlertTriangle
                style={{
                  fontSize: '48px',
                  color: '#dc3545',
                  display: 'inline-block'
                }}
              />
            </div>
            <p className="mb-4" style={{ fontSize: '20px', color: '#dc3545', fontWeight: '500' }}>
              {message} {itemName}?
            </p>
            <div className="d-flex justify-content-center gap-3">
              <button
                type="button"
                className="btn"
                onClick={onClose}
                style={{
                  backgroundColor: '#d4af37',
                  borderColor: '#d4af37',
                  color: '#fff',
                  fontWeight: 'bold',
                  padding: '10px 30px',
                  fontSize: '16px',
                  minWidth: '100px'
                }}
              >
                No
              </button>
              <button
                type="button"
                className="btn"
                onClick={handleConfirm}
                style={{
                  backgroundColor: '#dc3545',
                  borderColor: '#dc3545',
                  color: '#fff',
                  fontWeight: 'bold',
                  padding: '10px 30px',
                  fontSize: '16px',
                  minWidth: '100px'
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}