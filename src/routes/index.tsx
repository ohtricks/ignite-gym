import { useTheme, Box } from "native-base";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

export function Routes(){
    const nativeBaseTheme = useTheme();
    const theme = DefaultTheme;
    theme.colors.background = nativeBaseTheme.colors.gray[700];
    return (
        <Box flex={1} bg="gray.700">
            <NavigationContainer>
                <AuthRoutes />
            </NavigationContainer>
        </Box>
    )
}