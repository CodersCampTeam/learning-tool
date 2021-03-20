import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { css, jsx } from '@emotion/react';
import Button from '@material-ui/core/Button';

 

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

 

const createData =  (name: string, flashCards: number, answers: number, sessions: number, correctanswers: number, wronganswers: number) => {
  return { name, flashCards, answers, sessions, correctanswers, wronganswers };
}

const rows = [
  createData('MongoDB', 159, 1056, 24, 567, 534),
  createData('TypeScript', 237, 2366, 37, 1090, 1235),
  createData('React', 262, 3455, 24, 1709, 1690),
  createData('CSS', 305, 2341, 67, 889, 1380),
  createData('JEST', 356, 6678, 49, 4310, 2056),
];
 
const BasicTable = () => {

  return (
    <TableContainer component={Paper}>
      <Table  aria-label="customized table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Collection Name</StyledTableCell>
            <StyledTableCell align="center">FlashCards</StyledTableCell>
            <StyledTableCell align="center">Answers&nbsp;</StyledTableCell>
            <StyledTableCell align="center">Sessions&nbsp;</StyledTableCell>
            <StyledTableCell align="center">Correct Answers&nbsp;</StyledTableCell>
            <StyledTableCell align="center">Wrong Answers&nbsp;</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.flashCards}</StyledTableCell>
              <StyledTableCell align="center">{row.answers}</StyledTableCell>
              <StyledTableCell align="center">{row.sessions}</StyledTableCell>
              <StyledTableCell align="center">{row.correctanswers}</StyledTableCell>
              <StyledTableCell align="center">{row.wronganswers}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <Button>Default</Button>
      <div>
      <Button>Default</Button>
      <Button
        css = {css`
          background-color: rgba(50, 50, 93, 0.11);
          color: #fff;
          box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
          padding: 7px 14px;
          &:hover {
            background-color: #5469d4;
          }
        `}
      >
        Customized
      </Button>
    </div>
    </TableContainer>
    
  );
}

export default BasicTable