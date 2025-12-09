import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = login(email, password);
        
        if (success) {
            toast.success("¡Bienvenido Admin!");
            navigate('/admin');
        } else {
            toast.error("Credenciales incorrectas (Prueba: admin@admin.com / 123456)");
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
            <div className="card shadow p-4">
                <h2 className="text-center mb-4">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Entrar</button>
                </form>
                <div className="mt-3 text-center text-muted text-small">
                    <small>User: admin@admin.com | Pass: 123456</small>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;