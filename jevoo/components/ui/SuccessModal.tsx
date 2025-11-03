'use client';

import React from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export default function SuccessModal({ isOpen, onClose, message }: SuccessModalProps) {
  if (!isOpen) return null;

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
              <i
                className="pe-7s-check"
                style={{
                  fontSize: '48px',
                  color: '#28a745',
                  display: 'inline-block'
                }}
              ></i>
            </div>
            <h4
              className="modal-title mb-3"
              style={{
                fontSize: '22px',
                fontWeight: 'bold',
                color: '#28a745'
              }}
            >
              Success!
            </h4>
            <p
              className="mb-4"
              style={{
                fontSize: '16px',
                color: '#333',
                lineHeight: '1.5'
              }}
            >
              {message}
            </p>
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
                minWidth: '120px'
              }}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}