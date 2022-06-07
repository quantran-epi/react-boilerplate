import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useAppContext } from '@app-context';
import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Form } from '@components/Form';
import { Checkbox } from '@components/Form/Checkbox';
import { Input } from '@components/Form/Input';
import { Center } from '@components/Layout/Center';
import { Container } from '@components/Layout/Container';
import { Space } from '@components/Layout/Space';
import { RootRoutes } from '@routing/RootRoutes';
import { Image } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { FunctionComponent } from 'react';
import { useMutation } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { ILoginViewModel } from '../ViewModels/LoginViewModel';

interface ILoginScreenProps {

}

export const LoginScreen: FunctionComponent<ILoginScreenProps> = ({

}) => {
    const location = useLocation();

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

    return <Container style={{ height: "100%" }}>
        <Center>
            <Card style={{ padding: 15 }}>
                <Space direction='vertical' size="middle" align='center'>
                    <Image
                        preview={false}
                        src='https://www.shb.com.vn/wp-content/uploads/2016/03/Logo-SHB-VN.png'
                        width={200} />
                    <Form
                        name="login"
                        form={form}
                        initialValues={{ username: "chungps", password: "Shb@2022" }}
                        onFinish={_onSubmit}
                        style={{ width: 250 }}>
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' }]}>
                            <Input autoFocus prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}>
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                        </Form.Item>

                        <Button loading={isLoading} block type="primary" htmlType="submit">
                            Log in
                        </Button>
                    </Form>
                </Space>
            </Card>
        </Center>
    </Container>
}