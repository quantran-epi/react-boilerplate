import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useAppContext } from '@app-context';
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
import { Image } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useMutation } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import login_bg from '../../../../assets/images/login-bg.jpeg';
import { ILoginViewModel } from '../ViewModels/LoginViewModel';

interface ILoginScreenProps {

}

export const LoginScreen: FunctionComponent<ILoginScreenProps> = ({

}) => {
    const location = useLocation();
    const { t } = useTranslation();
    const { innerHeight, innerWidth, availHeight, availWidth } = useWindowDimension();

    const _login = async (values: ILoginViewModel) => {
        return await services.Auth.login(values);
    }

    const [form] = useForm<ILoginViewModel>();
    const { services } = useAppContext();
    const navigate = useNavigate();
    const { isLoading, mutate } = useMutation({
        mutationFn: _login,
        onSuccess: (user) => {
            if (user) {
                let returnUrl = (location.state as any)?.returnUrl;
                if (!returnUrl || _isLoginUrl(returnUrl)) navigate(RootRoutes.AuthorizedRoutes.Root);
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
        <div style={{ position: "fixed", top: 0, left: 0, bottom: 0, right: 0, backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
            <Center style={{ position: "fixed", top: 0, bottom: 0, right: "7%" }}>
                <Card style={{ padding: "5px 18px 18px 18px", borderRadius: 10 }}>
                    <Space direction='vertical' size="middle" align='center'>
                        <Space size={0} direction='vertical'>
                            <Image
                                preview={false}
                                src='https://www.shb.com.vn/wp-content/uploads/2016/03/Logo-SHB-VN.png'
                                width={200} />
                            <Typography.Title level={3} style={{ color: "#f58220" }}>{t("Common:TopNavigation.AppName")}</Typography.Title>
                        </Space>
                        <Form
                            name="login"
                            form={form}
                            layout="vertical"
                            initialValues={{ username: "chungps", password: "Shb@2022" }}
                            onFinish={_onSubmit}
                            style={{ width: 300 }}>
                            <Form.Item
                                requiredMark={'optional'}
                                label={t("Auth:Login.Form.Username")}
                                name="username"
                                rules={[{ required: true, message: 'Please input your Username!' }]}>
                                <Input autoFocus prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                requiredMark={'optional'}
                                label={t("Auth:Login.Form.Password")}
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
        </div>
    </Container>
}