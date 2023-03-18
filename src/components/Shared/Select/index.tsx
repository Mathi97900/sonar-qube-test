import { Popover } from '@material-ui/core';
import { makeStyles } from '@mui/styles';
import { useTheme } from 'emotion-theming';
import { useEffect, useState } from 'react';
import { Flex, Image, Text } from 'rebass';
import ArrowDown from '../../../assets/ArrowDown.svg';
import ArrowUp from '../../../assets/ArrowUp.svg';
import { Theme } from '../../../theme/px/types';
import FlexBox from '../../utility/FlexBox';

export interface SelectProps {
  activeOption: string,
  options: { lbl: string, val: string }[],
  setOption: (value: string) => void // eslint-disable-line no-unused-vars
}

const useStyles = makeStyles(() => ({
  selectedOption: {
    fontFamily: 'AvenirLTPro-Heavy',
    fontWeight: 900,
    fontSize: '16px',
    lineHeight: '150%',
    cursor: 'pointer',
    color: '#4E4E4E'
  },
  option: {
    fontFamily: 'AvenirLTPro-Book',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '150%',
    color: '#949494'
  }
}));

export function SelectBox({ activeOption, options, setOption }: SelectProps) {
  const classes = useStyles();
  const theme = useTheme<Theme>();

  const [isOpen, setIsOpen] = useState<HTMLDivElement | null>(null);
  const [option, setActiveOption] = useState<string>(activeOption);
  const open = Boolean(isOpen);
  console.log(activeOption, option);

  useEffect(() => {
    setActiveOption(activeOption);
  }, [activeOption]);
  return (
    <FlexBox vertical>
      <FlexBox width="150px" height="40px" onClick={(event) => setIsOpen(event.currentTarget)} alignItems="center" sx={{ cursor: 'pointer' }}>
        <Flex
          width="70%"
          alignItems="center"
          justifyContent="center"
          sx={{
            height: '40px',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            background: '#ffffff',
            border: '0.5px solid #D1D1D1',
            borderRadius: '8px 0px 0px 8px',
            width: '100%',
            borderRight: 0
          }}
        >
          <Text className={classes.selectedOption}>{option}</Text>
        </Flex>
        <Flex
          width="30%"
          height="100%"
          alignItems="center"
          justifyContent="center"
          sx={{ background: '#F5F5F5', borderRadius: '0px 8px 8px 0px' }}
        >
          {isOpen ? (
            <Image src={ArrowUp} />
          ) : (
            <Image src={ArrowDown} />
          )}
        </Flex>
      </FlexBox>
      {isOpen && (
        <Popover
          onClose={() => setIsOpen(null)}
          open={open}
          anchorEl={isOpen}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          PaperProps={{
            style: {
              width: '150px',
              // background: '#FFFFFF',
              border: '0.5px solid #D1D1D1',
              borderRadius: '0px 0px 8px 8px'
            }
          }}
        >
          <FlexBox vertical sx={{ padding: '0 20px' }} pb={theme.marginSpacing.xs}>
            {options.map((opt) => (
              <Text
                className={classes.selectedOption}
                key={opt.val}
                mt={theme.marginSpacing.xs}
                value={option}
                onClick={(e: any) => {
                  console.log(e.target.value);
                  setOption(opt.val);
                  setIsOpen(null);
                  setActiveOption(opt.lbl);
                }}
              >
                {opt.lbl}
              </Text>
            ))}
          </FlexBox>
        </Popover>
      )}
    </FlexBox>
  );
}
