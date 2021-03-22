import styled from '@emotion/styled'
import { Button } from '@material-ui/core';
import theme from '../../themes/theme';

type StyledButtonProps = {
  test?: any
}

const StyledButton = styled(Button)`
&& {
  padding: 50px;
  font-size: 24px;
  border-radius: 4px;
  font-weight: ${(props: StyledButtonProps) =>
    props.test ? '400' : '500'};  
    &:hover {
    color: white;
  }
`

export default StyledButton;