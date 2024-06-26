import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";

type Props = IButtonProps & {
    title: string;
    variant?: 'solid' | 'outline';
}

export function Button({title, variant = 'solid', ...rest}: Props){
    return (
        <ButtonNativeBase {...rest} w="full" h={14} 
            borderColor="green.700"
            bg={variant === "outline" ? "transparent" : "green.700"}
            borderWidth={variant === "outline" ? 1 : 0}
            _pressed={{ 
                bg: variant === "outline" ? "gray.500" : "green.500"
            }}>
            <Text fontFamily="heading" fontSize="sm"
                color={variant === "outline" ? "green.500" : "white"}>
                {title}
            </Text>
        </ButtonNativeBase>
    )
}