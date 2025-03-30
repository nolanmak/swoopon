import { useState } from 'react';

const Swap = () => {
  const [sellAmount, setSellAmount] = useState('');
  const [buyAmount, setBuyAmount] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  
  const handleToggle = () => {
    setIsFlipped(!isFlipped);
  };
  
  return (
    <div style={{
      maxWidth: '600px',
      width: '100%',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* First Card (Sell/Buy depending on flip state) */}
      <div style={{
        backgroundColor: isFlipped ? '#f9f9f9' : 'white',
        borderRadius: '20px',
        padding: '20px',
        marginBottom: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ fontSize: '20px', color: '#666', marginBottom: '20px' }}>{isFlipped ? 'Buy' : 'Sell'}</div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <input
            type="text"
            value={isFlipped ? buyAmount : sellAmount}
            onChange={(e) => isFlipped ? setBuyAmount(e.target.value) : setSellAmount(e.target.value)}
            placeholder="0"
            style={{
              fontSize: '42px',
              border: 'none',
              outline: 'none',
              width: '60%',
              fontWeight: '500',
              color: '#333'
            }}
          />
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: isFlipped ? '#fc72ff' : '#f0f0f0',
            color: isFlipped ? 'white' : 'inherit',
            borderRadius: '16px',
            padding: '8px 16px',
            cursor: 'pointer'
          }}>
            {isFlipped ? null : (
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                backgroundColor: '#627EEA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '8px'
              }}>
                <img 
                  src="https://cryptologos.cc/logos/ethereum-eth-logo.svg" 
                  alt="ETH"
                  style={{ width: '20px', height: '20px' }}
                />
              </div>
            )}
            <span style={{ fontWeight: '600', fontSize: '18px' }}>{isFlipped ? 'Select token' : 'ETH'}</span>
            <span style={{ 
              marginLeft: '8px',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              ▼
            </span>
          </div>
        </div>
        {!isFlipped && (
          <div style={{ fontSize: '16px', color: '#888', marginTop: '10px' }}>
            ${sellAmount ? Number(sellAmount) * 3000 : 0}
          </div>
        )}
      </div>
      
      {/* Arrow/Swap Icon */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        height: '40px'
      }}>
        <div 
          onClick={handleToggle}
          style={{
            width: '40px',
            height: '40px',
            backgroundColor: '#f0f0f0',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '2',
            cursor: 'pointer',
            transition: 'transform 0.3s ease'
          }}
        >
          <span style={{ 
            fontSize: '24px',
            transform: isFlipped ? 'rotate(180deg)' : 'rotate(0deg)',
            display: 'inline-block',
            transition: 'transform 0.3s ease'
          }}>↓</span>
        </div>
      </div>
      
      {/* Second Card (Buy/Sell depending on flip state) */}
      <div style={{
        backgroundColor: isFlipped ? 'white' : '#f9f9f9',
        borderRadius: '20px',
        padding: '20px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)'
      }}>
        <div style={{ fontSize: '20px', color: '#666', marginBottom: '20px' }}>{isFlipped ? 'Sell' : 'Buy'}</div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <input
            type="text"
            value={isFlipped ? sellAmount : buyAmount}
            onChange={(e) => isFlipped ? setSellAmount(e.target.value) : setBuyAmount(e.target.value)}
            placeholder="0"
            style={{
              fontSize: '42px',
              border: 'none',
              outline: 'none',
              width: '60%',
              fontWeight: '500',
              backgroundColor: 'transparent',
              color: '#333'
            }}
          />
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: isFlipped ? '#f0f0f0' : '#fc72ff',
            color: isFlipped ? 'inherit' : 'white',
            borderRadius: '16px',
            padding: '8px 16px',
            cursor: 'pointer'
          }}>
            {isFlipped && (
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                backgroundColor: '#627EEA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '8px'
              }}>
                <img 
                  src="https://cryptologos.cc/logos/ethereum-eth-logo.svg" 
                  alt="ETH"
                  style={{ width: '20px', height: '20px' }}
                />
              </div>
            )}
            <span style={{ fontWeight: '600', fontSize: '18px' }}>{isFlipped ? 'ETH' : 'Select token'}</span>
            <span style={{ 
              marginLeft: '8px',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              ▼
            </span>
          </div>
        </div>
      </div>
      
      {/* Price indicator - appears at bottom after flipping */}
      {isFlipped && (
        <div style={{ fontSize: '16px', color: '#888', marginTop: '10px', padding: '0 20px' }}>
          ${sellAmount ? Number(sellAmount) * 3000 : 0}
        </div>
      )}
    </div>
  );
};

export default Swap;
