import React from 'react';

const PaginationSelection = ({ selectedPagination, onPaginationSelect }) => {
  const handlePaginationChange = (e) => {
    onPaginationSelect(e.target.value);
  };

  return (
    <div>
      <h2 style={{ color: '#2271b1', marginBottom: '20px' }}>
      Choisissez si vous souhaitez afficher
        <br />
        les événements avec ou sans pagination:
      </h2>
      <ul>
        <li>
          <label>
            <input
              type="radio"
              value="true"
              checked={selectedPagination === 'true'}
              onChange={handlePaginationChange}
            />
          Avec Pagination
          </label>
        </li>
        <li>
          <label>
            <input
              type="radio"
              value="false"
              checked={selectedPagination === 'false'}
              onChange={handlePaginationChange}
            />
            Sans pagination
          </label>
        </li>
      </ul>
    </div>
  );
};

export default PaginationSelection;
