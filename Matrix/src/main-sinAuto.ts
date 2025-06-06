 // ===================================================================
// MAIN.TS - Sistema de Navegación Principal
// Matrix Galactic Odyssey - News API
// ===================================================================

console.log("🚀 Iniciando Main Navigation System...");

// Tipos TypeScript
interface Section {
  id: string;
  name: string;
  tabId: string;
}

interface NavigationSystem {
  currentSection: string;
  sections: Section[];
  showSection: (sectionId: string) => void;
  init: () => void;
}

// ===================================================================
// SISTEMA DE NAVEGACIÓN PRINCIPAL
// ===================================================================
class MainNavigationSystem implements NavigationSystem {
  currentSection: string = 'matrix-section';
  sections: Section[] = [
    { id: 'matrix-section', name: 'Matrix Voyager', tabId: 'matrix-tab' },
    { id: 'nasa-section', name: 'NASA Daten', tabId: 'nasa-tab' },
    { id: 'jedi-section', name: 'Jedi Weisheit', tabId: 'jedi-tab' },
    { id: 'weather-section', name: 'Wetter', tabId: 'weather-tab' },
    { id: 'hackers-section', name: 'Real News API', tabId: 'hackers-tab' },
    { id: 'algorithm-section', name: 'Dijkstra', tabId: 'algorithm-tab' }
  ];

  constructor() {
    console.log("🎯 MainNavigationSystem initialized");
  }

  /**
   * Muestra una sección específica y oculta las demás
   */
  showSection = (sectionId: string): void => {
    try {
      // Ocultar todas las secciones
      this.sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          element.style.display = 'none';
        }
      });

      // Quitar clase active de todos los botones
      const navButtons = document.querySelectorAll('.nav-button');
      navButtons.forEach(btn => btn.classList.remove('active'));

      // Mostrar la sección seleccionada
      const targetSection = document.getElementById(sectionId);
      if (targetSection) {
        targetSection.style.display = 'block';
        this.currentSection = sectionId;
        console.log(`✅ Switched to section: ${sectionId}`);
      } else {
        console.error(`❌ Section not found: ${sectionId}`);
        return;
      }

      // Activar el botón correspondiente
      const section = this.sections.find(s => s.id === sectionId);
      if (section) {
        const targetButton = document.getElementById(section.tabId);
        if (targetButton) {
          targetButton.classList.add('active');
        }
      }

      // Log de estado para debugging
      console.log(`🔄 Navigation: ${this.currentSection}`);
      
    } catch (error) {
      console.error('❌ Error in showSection:', error);
    }
  };

  /**
   * Inicializa el sistema de navegación
   */
  init = (): void => {
    console.log("🔧 Initializing navigation system...");
    
    // Esperar a que el DOM esté cargado
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', this.setupEventListeners);
    } else {
      this.setupEventListeners();
    }
  };

  /**
   * Configura los event listeners para los botones de navegación
   */
  private setupEventListeners = (): void => {
    try {
      this.sections.forEach(section => {
        const button = document.getElementById(section.tabId);
        if (button) {
          button.addEventListener('click', () => this.showSection(section.id));
          console.log(`✅ Event listener added for: ${section.tabId}`);
        } else {
          console.warn(`⚠️ Button not found: ${section.tabId}`);
        }
      });

      // Mostrar la sección por defecto
      this.showSection(this.currentSection);
      
      console.log("✅ Navigation system ready!");
      
    } catch (error) {
      console.error('❌ Error setting up event listeners:', error);
    }
  };

  /**
   * Obtiene información del estado actual
   */
  getStatus = (): { current: string; available: string[] } => {
    return {
      current: this.currentSection,
      available: this.sections.map(s => s.id)
    };
  };
}

// ===================================================================
// FUNCIONES GLOBALES PARA COMPATIBILIDAD
// ===================================================================

// Instancia global del sistema de navegación
let mainNav: MainNavigationSystem;

/**
 * Función global para mostrar secciones (compatibilidad con código existente)
 */
window.showSection = function(sectionId: string): void {
  if (mainNav) {
    mainNav.showSection(sectionId);
  } else {
    console.error('❌ Navigation system not initialized');
  }
};

/**
 * Función para obtener el estado de navegación
 */
window.getNavigationStatus = function() {
  return mainNav ? mainNav.getStatus() : null;
};

// ===================================================================
// INICIALIZACIÓN AUTOMÁTICA
// ===================================================================

// Inicializar cuando se carga el script
(() => {
  try {
    mainNav = new MainNavigationSystem();
    mainNav.init();
    
    // Hacer disponible globalmente para debugging
    (window as any).mainNav = mainNav;
    
    console.log("🎉 Main navigation system loaded successfully!");
    
  } catch (error) {
    console.error('❌ Error initializing main navigation:', error);
  }
})();

// ===================================================================
// UTILIDADES DE DEBUGGING
// ===================================================================

/**
 * Función de debugging para inspeccionar el estado
 */
window.debugNavigation = function(): void {
  if (mainNav) {
    console.log("🔍 Navigation Debug Info:");
    console.log("Current section:", mainNav.currentSection);
    console.log("Available sections:", mainNav.sections);
    console.log("Status:", mainNav.getStatus());
  } else {
    console.log("❌ Navigation system not available");
  }
};

// Exportar para uso en otros módulos si es necesario
export { MainNavigationSystem, type Section, type NavigationSystem };
