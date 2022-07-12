import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { AppColor } from '@common/Constants/AppColor';
import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Form } from '@components/Form';
import { Input } from '@components/Form/Input';
import { Box } from '@components/Layout/Box';
import { Center } from '@components/Layout/Center';
import { Container } from '@components/Layout/Container';
import { Space } from '@components/Layout/Space';
import { Typography } from '@components/Typography';
import { useWindowDimension } from '@hooks';
import { RootRoutes } from '@routing/RootRoutes';
import { useStore } from '@store';
import { Image } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useMutation } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import login_bg from '../../../../assets/images/login-bg-7.png';
import { ILoginViewModel } from '../ViewModels/LoginViewModel';
import './Login.less';

interface ILoginScreenProps {

}

export const LoginScreen: FunctionComponent<ILoginScreenProps> = ({

}) => {
    const services = useStore(state => state.services);
    const location = useLocation();
    const { t } = useTranslation();
    const { innerHeight, innerWidth, availWidth } = useWindowDimension();

    const _login = async (values: ILoginViewModel) => {
        return await services.Auth.SignIn.login(values);
    }

    const [form] = useForm<ILoginViewModel>();
    const navigate = useNavigate();
    const { isLoading, mutate } = useMutation({
        mutationFn: _login,
        onSuccess: (user) => {
            if (user) {
                let returnUrl = (location.state as any)?.returnUrl;
                if (!returnUrl || _isLoginUrl(returnUrl) || !services.Permission.Role.isAuthorized(returnUrl)) navigate(RootRoutes.AuthorizedRoutes.Root);
                else navigate(returnUrl);
            }
        }
    })

    const _onSubmit = (values: ILoginViewModel) => {
        mutate(values);
    }

    const _isLoginUrl = (path: string): boolean => {
        return path.startsWith("/auth");
    }

    return <Container style={{ overflowY: 'hidden' }}>
        <Box width={innerWidth} height={innerHeight}>
            <LazyLoadImage
                src={login_bg} // use normal <img> attributes as props
                width={availWidth} />
        </Box>
        <div style={{ position: "fixed", top: 0, left: 0, bottom: 0, right: 0 }}>
            <Center style={{ position: "fixed", top: 0, bottom: 0, left: "7%" }}>
                <Card style={{ padding: "5px 10px 10px 10px", borderRadius: 10, boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px" }}>
                    <Space direction='vertical' size="middle" align='center'>
                        <Space size={0} direction='vertical'>
                            <Image
                                preview={false}
                                src='https://www.shb.com.vn/wp-content/uploads/2016/03/Logo-SHB-VN.png'
                                width={200} />
                            {/* <Typography.Title level={3} style={{ color: AppColor.primary, fontFamily: "Fira Sans" }}>{t("Common:TopNavigation.AppNameAbbr")}</Typography.Title> */}
                            <Typography.Title level={4} style={{ color: AppColor.primary, fontFamily: "Fira Sans" }}>{t("Common:TopNavigation.AppName")}</Typography.Title>
                        </Space>
                        <Form
                            name="login"
                            form={form}
                            layout="vertical"
                            initialValues={{ username: "chungps", password: "Tham@1999" }}
                            onFinish={_onSubmit}
                            style={{ width: 300 }}>
                            <Form.Item
                                requiredMark={'optional'}
                                label={<Typography.Text style={{ margin: 0, color: '#404040' }}>{t("Auth:Login.Form.Username")}</Typography.Text>}
                                name="username"
                                rules={[{ required: true, message: 'Please input your Username!' }]}>
                                <Input
                                    autoFocus
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                requiredMark={'optional'}
                                label={<Typography.Text style={{ margin: 0, color: '#404040' }}>{t("Auth:Login.Form.Password")}</Typography.Text>}
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}>
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            {/* <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>
                            </Form.Item> */}

                            <Button
                                loading={isLoading}
                                block
                                type="primary"
                                htmlType="submit"
                                style={{
                                    backgroundColor: AppColor.primary,
                                    borderColor: AppColor.primary
                                }}>
                                {t("Auth:Login.Form.LoginButton")}
                            </Button>
                        </Form>
                    </Space>
                </Card>
            </Center>
            {/* <Center style={{ position: "fixed", top: 0, bottom: 0, right: "15%", paddingBottom: 60 }}>
                <Typography.Title
                    level={2}
                    style={{
                        textShadow: `2px 2px 0px rgba(43,45,43,0.5)`,
                        color: "#fff",
                        margin: 0,
                        fontFamily: "Fira Sans"
                    }}>
                    <Space>
                        {t("Common:TopNavigation.AppName").split(' ').map((e, i) =>
                            <span key={e.concat(i.toString())} style={{
                                animation: `fade-in 0.3s 0.${i + 1}s forwards cubic-bezier(0.11, 0, 0.5, 0)`
                            }}>{e}</span>
                        )}
                    </Space>
                </Typography.Title>

                <Typography.Title
                    level={1}
                    style={{
                        textShadow: '0.8px 0.8px 0px rgba(255,255,255,1)',
                        color: '#e07112',
                        margin: 0,
                        fontSize: 60,
                        fontFamily: "Fira Sans"
                    }}>
                    <Space>
                        {t("Common:TopNavigation.AppNameAbbr").split(' ').map((e, i) =>
                            <span key={e.concat(i.toString())} style={{
                                animation: `fade-in 0.3s 1.${i + 1}s forwards cubic-bezier(0.11, 0, 0.5, 0)`
                            }}>{e}</span>
                        )}
                    </Space>
                </Typography.Title>

            </Center> */}
        </div>
    </Container>
}