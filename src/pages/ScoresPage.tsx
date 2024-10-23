// src/pages/ScoresPage.tsx
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// Function to create data rows
function createData(name: string, score: number, date: string) {
  return { name, score, date };
}

// Sample data
const rows = [
  createData('John Doe', 85, '2024-09-25'),
  createData('Jane Smith', 92, '2024-09-24'),
  createData('Alice Johnson', 78, '2024-09-23'),
  createData('Bob Brown', 88, '2024-09-22'),
  createData('Charlie Davis', 95, '2024-09-21'),
];

const ScoresPage: React.FC = () => {

  return (
    <div className=' overflow-hidden flex items-center '>
      

      {/* Box Containing Main Body */}
      <div className="p-5 flex rounded-2xl border-[8px] border-[#0C2340] flex-col bg-white  font-sans">
        <h1 className="text-2xl  justify-center flex font-bold text-black mb-4">See Your Scores Here!</h1>
        
        {/* Box Containing Main Body */}
        <div className='justify-center rounded-lg flex border-2 text-black'>
        <TableContainer component={Paper}>
          <Table aria-label="score table">
            <TableHead>
              <TableRow>
                <TableCell align='center'>Name</TableCell>
                <TableCell align="center">Score</TableCell>
                <TableCell align="center">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align='center'>
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.score}</TableCell>
                  <TableCell align="center">{row.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
      </div>
        
    </div>
  );
};

export default ScoresPage;