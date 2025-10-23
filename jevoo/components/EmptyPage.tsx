'use client';

interface EmptyPageProps {
  currentPage: number;
  totalPages: number;
  onGoToFirstPage: () => void;
}

export default function EmptyPage({ currentPage, totalPages, onGoToFirstPage }: EmptyPageProps) {
  return (
    <div className="row">
      <div className="col-12">
        <div className="empty-page text-center py-5">
          <div className="empty-page-icon mb-4">
            <i className="fas fa-search" style={{ fontSize: '4rem', color: '#ccc' }}></i>
          </div>
          <h3 className="empty-page-title mb-3">Page {currentPage} is Empty</h3>
          <p className="empty-page-description mb-4">
            This page doesn't contain any products. 
            {currentPage > totalPages ? 
              ` You're trying to access page ${currentPage}, but we only have ${totalPages} page${totalPages !== 1 ? 's' : ''} available.` :
              ' The products for this page are not available.'
            }
          </p>
          <div className="empty-page-actions">
            <button
              onClick={onGoToFirstPage}
              className="btn btn-primary me-3"
            >
              <i className="fas fa-home me-2"></i>
              Go to Page 1
            </button>
            <button
              onClick={() => window.history.back()}
              className="btn btn-outline-secondary"
            >
              <i className="fas fa-arrow-left me-2"></i>
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
