import styled from '@emotion/styled'
import { Button } from '@material-ui/core';
import theme from '../../themes/theme';

const StyledButton = styled(Button)`
&& {
  padding: 50px;
  font-size: 24px;
  border-radius: 4px;
  color: hotpink;
  font-weight: bold;
  &:hover {
    color: white;
  }
`

export default StyledButton;