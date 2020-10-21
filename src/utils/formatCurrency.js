const formatCurrency = (num) => {
    let formatted = Number(num).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return formatted;
}  

export default formatCurrency;