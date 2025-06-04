
# Deploy no VPS - Leililind Catálogos

## Pré-requisitos

1. **VPS com Ubuntu 20.04+** ou similar
2. **Docker e Docker Compose** instalados
3. **Git** instalado
4. **Nginx** (opcional, se não usar o container)

## Instalação do Docker

```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Adicionar usuário ao grupo docker
sudo usermod -aG docker $USER
```

## Deploy da Aplicação

1. **Clone o repositório:**
```bash
git clone <seu-repositorio>
cd leililind-catalogos
```

2. **Configure permissões:**
```bash
chmod +x deploy.sh
```

3. **Execute o deploy:**
```bash
./deploy.sh
```

4. **Verificar se está rodando:**
```bash
docker-compose ps
```

## Configuração de Domínio (Opcional)

1. **Configure DNS do domínio** apontando para o IP do VPS

2. **Instale Certbot para SSL gratuito:**
```bash
sudo apt install certbot
sudo certbot certonly --standalone -d seudominio.com
```

3. **Edite nginx.conf** e descomente a seção HTTPS, ajustando:
   - `server_name` para seu domínio
   - Caminhos dos certificados SSL

4. **Reinicie os containers:**
```bash
docker-compose restart
```

## Estrutura dos Arquivos

- `Dockerfile` - Configuração da imagem Docker
- `docker-compose.yml` - Orquestração dos containers
- `nginx.conf` - Configuração do servidor web
- `deploy.sh` - Script de deploy automatizado

## Comandos Úteis

```bash
# Ver logs
docker-compose logs -f

# Parar serviços
docker-compose down

# Restart
docker-compose restart

# Atualizar aplicação
./deploy.sh
```

## Firewall (UFW)

```bash
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw enable
```

## Monitoramento

- **Logs do Nginx:** `docker-compose logs nginx`
- **Logs da App:** `docker-compose logs app`
- **Status:** `docker-compose ps`

## Backup

Recomenda-se fazer backup regular de:
- Código fonte
- Certificados SSL (se configurados)
- Logs importantes

## Troubleshooting

1. **Container não inicia:**
   ```bash
   docker-compose logs
   ```

2. **Erro de permissão:**
   ```bash
   sudo chown -R $USER:$USER .
   ```

3. **Porta ocupada:**
   ```bash
   sudo netstat -tulpn | grep :80
   sudo kill -9 <PID>
   ```
