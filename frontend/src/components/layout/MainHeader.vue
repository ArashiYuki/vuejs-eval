<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-light border-bottom border-black" data-bs-theme="light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#"><i class="bi bi-wallet me-3"></i>Factures</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <RouterLink activeClass="active" to="/" class="nav-link"
                ><i class="bi bi-house-door-fill me-2"></i>Accueil</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink activeClass="active" to="/factures" class="nav-link"
                ><i class="bi bi-file-earmark me-2"></i>Factures</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink activeClass="active" to="/clients" class="nav-link"
                ><i class="bi bi-people-fill me-2"></i>Clients</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink activeClass="active" to="/about" class="nav-link"
                >A propos</RouterLink
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
