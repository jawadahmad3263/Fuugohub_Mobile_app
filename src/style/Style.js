import { StyleSheet } from 'react-native';
import COLORS from './colors';

const Style = StyleSheet.create({
  // Flex directions
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: 36
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },

  // Alignment
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyAround: {
    justifyContent: 'space-around',
  },
  justifyEvenly: {
    justifyContent: 'space-evenly',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },


  // Gaps (use with row/column)
  gap4: {
    gap: 4,
  },
  gap8: {
    gap: 8,
  },
  gap12: {
    gap: 12,
  },
  gap16: {
    gap: 16,
  },
  gap20: {
    gap: 20,
  },
  gap24: {
    gap: 24,
  },
  gap32: {
    gap: 32,
  },

  // Font sizes
  font10: {
    fontSize: 10,
  },
  font12: {
    fontSize: 12,
  },
  font14: {
    fontSize: 14,
  },
  font16: {
    fontSize: 16,
  },
  font18: {
    fontSize: 18,
  },
  font20: {
    fontSize: 20,
  },
  font24: {
    fontSize: 24,
  },
  font28: {
    fontSize: 28,
  },
  font32: {
    fontSize: 32,
  },
  font36: {
    fontSize: 36,
  },
  font40: {
    fontSize: 40,
  },

  // Font weights
  bold: {
    fontWeight: 'bold',
 
  },
  semibold: {
    fontWeight: '600',
 
  },
  medium: {
    fontWeight: '500',
  
  },
  regular: {
    fontWeight: '400',
   
  },
  light: {
    fontWeight: '300',
   
  },
  thin: {
    fontWeight: '100',
    
  },

  // Text align
  textCenter: {
    textAlign: 'center',
  },
  textLeft: {
    textAlign: 'left',
  },
  textRight: {
    textAlign: 'right',
  },

  // text color
  textPrimary: {
    color: COLORS.textPrimary,
  },
  textSecondary: {
    color: COLORS.textSecondary,
  },
  border:{
    borderColor:COLORS.border,
    borderWidth:1
  },
  nextButton: {
    marginTop: 0,
    marginBottom: 10,
    width: "100%",
  },
  nextButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  hpadding:{
    paddingHorizontal: 16,
  },
  // Additional common styles
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rounded12: {
    borderRadius: 12,
  },
  rounded8: {
    borderRadius: 8,
  },
  // Margin utilities
  marginTop16: {
    marginTop: 16,
  },
  marginTop24: {
    marginTop: 24,
  },
  marginBottom16: {
    marginBottom: 16,
  },
  marginBottom24: {
    marginBottom: 24,
  },
});

export default Style;
