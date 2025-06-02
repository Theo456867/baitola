//Sinceramente maior parte disso eu não sei 
// Função para controlar a navegação responsiva para o direocionamento funcionar
document.addEventListener('DOMContentLoaded', function() {
  // Elementos da navegação
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('navbar-links');
  const allNavLinks = document.querySelectorAll('.nav-link');
  const currentYear = document.getElementById('current-year');
  
  // Definir o ano atual no rodapé
  currentYear.textContent = new Date().getFullYear();

  // Alternar menu mobile
  mobileMenuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    
    // Alternar ícone do menu (hambúrguer humi/fechar)
    const spans = mobileMenuBtn.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Fechar menu ao clicar em um link
  allNavLinks.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.classList.remove('active');
      
      // Restaurar ícone do menu
      const spans = mobileMenuBtn.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });

  // Mudar estilo da navbar no scroll
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Função para rolagem suave
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerOffset = 80; // Compensar a altura do header
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Configurações para os gráficos (simulação)
  const graphOptions = document.querySelectorAll('.graph-option');
  
  graphOptions.forEach(option => {
    option.addEventListener('click', function() {
      // Remover classe ativa de todas as opções
      graphOptions.forEach(opt => opt.classList.remove('active'));
      
      // Adicionar classe ativa na opção clicada
      this.classList.add('active');
    });
  });
});

// Simulação de dados em tempo real (para demonstração)
function simulateRealTimeData() {
  // Valores iniciais
  let co2Level = 412;
  let soundLevel = 42;
  let temperature = 26.5;
  let humidity = 68;
  
  // Atualizar valores a cada 5 segundos para simulação para não ser o mesmo valor
  setInterval(() => {
    // Pequenas variações aleatórias para simular como vai ficar 
    co2Level = Math.round((co2Level + (Math.random() * 10 - 5)) * 10) / 10;
    soundLevel = Math.round((soundLevel + (Math.random() * 5 - 2.5)) * 10) / 10;
    temperature = Math.round((temperature + (Math.random() * 1 - 0.5)) * 10) / 10;
    humidity = Math.round((humidity + (Math.random() * 2 - 1)) * 10) / 10;
    
    // Manter valores em faixas razoáveis
    co2Level = co2Level < 380 ? 380 : co2Level > 450 ? 450 : co2Level;
    soundLevel = soundLevel < 35 ? 35 : soundLevel > 55 ? 55 : soundLevel;
    temperature = temperature < 25 ? 25 : temperature > 28 ? 28 : temperature;
    humidity = humidity < 60 ? 60 : humidity > 75 ? 75 : humidity;
    
    // Atualizar elementos na página (se existirem)
    const monitoringValues = document.querySelectorAll('.monitoring-value');
    if (monitoringValues && monitoringValues.length >= 4) {
      monitoringValues[0].textContent = `${co2Level} ppm`;
      monitoringValues[1].textContent = `${soundLevel} dB`;
      monitoringValues[2].textContent = `${temperature} °C`;
      monitoringValues[3].textContent = `${humidity}%`;
    }
    
    // Atualizar barras de progresso
    const monitoringFills = document.querySelectorAll('.monitoring-fill');
    if (monitoringFills && monitoringFills.length >= 4) {
      monitoringFills[0].style.width = `${(co2Level - 350) / 3}%`;
      monitoringFills[1].style.width = `${soundLevel / 3.4}%`;
      monitoringFills[2].style.width = `${(temperature - 20) * 10}%`;
      monitoringFills[3].style.width = `${humidity}%`;
    }
    
    // Atualizar hora da última atualização
    const lastUpdate = document.querySelector('.last-update p');
    if (lastUpdate) {
      const now = new Date();
      const timeString = now.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      const dateString = now.toLocaleDateString('pt-BR');
      lastUpdate.textContent = `Última atualização: ${dateString} ${timeString}`;
    }
  }, 5000);
}

// Iniciar simulação após o carregamento da página
window.addEventListener('load', simulateRealTimeData);
