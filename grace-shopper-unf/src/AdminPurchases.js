import { StayPrimaryLandscape } from '@material-ui/icons';
import React from 'react';
import { Bar } from 'react-chartjs-2';



export default function AdminPurchases({ allPurchases }) {

  console.log(allPurchases);

  const labels = allPurchases.map(i => i.productName)
  const uniqueArr = [...new Set(labels)];
  const test = uniqueArr.map(i => allPurchases.filter(j => j.productName === i))
  const testTwo = test.map(i => i.map(j => j.quantity))
  const testThree = testTwo.map(i => i.reduce((a, b) => a + b, 0))

  const state = {
    labels: uniqueArr,
    datasets: [
      {
        backgroundColor: [
          '#093A3E',
          '#3AAFB9',
          '#B24C63',
          '#ED6A5A',
          '#3C5A14'
        ],
        hoverBackgroundColor: [
          'grey',
          'grey',
          'grey',
          'grey',
          'grey'
        ],
        data: [...testThree, 0]
      }
    ]
  }

  return (
    <div style={{ padding: '50px', backgroundImage: 'url(https://images.pexels.com/photos/6363791/pexels-photo-6363791.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)' }}>
      <div style={{ padding: '10px 0px', backgroundColor: 'white' }}>
        <Bar
          className="purchasesText"
          data={state}
          options={{
            title: {
              display: true,
              text: 'Number of Units Sold',
              fontSize: 30,
            },
            scales: {
              y: {
                beginAtZero: true
              }
            },
            legend: {
              display: false,
              position: 'right'
            }
          }}
        />
      </div>
    </div>
  );
}