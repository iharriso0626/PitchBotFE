import * as React from 'react';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import axios from 'axios';

// Define the type for the user data
interface UserData {
  username: string;
  score: number;
  user_rank: number;
}

const ScoresPage: React.FC = () => {
  const [rows, setRows] = useState<UserData[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    // Fetch data from the backend API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/scores');
        setRows(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className='overflow-hidden flex items-center justify-center h-full w-full'>
      {/* Box Containing Main Body */}
      <div className="flex rounded-2xl border-[8px]  h-full w-full border-[#0C2340] flex-col bg-white font-sans p-5">
        <h1 className="text-2xl justify-center flex font-bold text-black mb-4">See Your Scores Here!</h1>
        
        {/* Box Containing Main Body */}
        <div className='justify-center rounded-lg flex border-2 overflow-hidden custom-scroll-hidden text-black h-full w-full'>
          <TableContainer component={Paper} className="h-full w-full">
            <Table aria-label="score table" className="h-full w-full">
              <TableHead className=''>
                <TableRow className=''>
                  <TableCell align='center' >Name</TableCell>
                  <TableCell align="center">Score</TableCell>
                  <TableCell align="center">Rank</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow
                    key={row.username}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align='center'>
                      {row.username}
                    </TableCell>
                    <TableCell align="center">{row.score}</TableCell>
                    <TableCell align="center">{row.user_rank}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            className='flex-col flex'
          />
        </div>
      </div>
    </div>
  );
};

export default ScoresPage;